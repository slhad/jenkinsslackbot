var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var jenkins = require('jenkins');

import {} from 'primary';
import _ = require('underscore');

var bot_token = process.env.SLACK_BOT_TOKEN || '';
var jenkins_url = process.env.JENKINS_URL || '';
var log_level = process.env.LOG_LEVEL || '';
var crumb_issuer = process.env.CRUMB_ISSUER == "true" || false;


var jenkinsClient = jenkins({baseUrl: jenkins_url, crumbIssuer: crumb_issuer});

var opts: any = {};

if (log_level !== "") {
    opts["logLevel"] = log_level;
}

var rtm = new RtmClient(bot_token, opts);
rtm.start();

if (RegExp.prototype.flags === undefined) {
    Object.defineProperty(RegExp.prototype, 'flags', {
        configurable: true,
        get: function () {
            return this.toString().match(/[gimuy]*$/)[0];
        }
    });
}

function extractRegex(regex: RegExp, data: string) {
    let regexClone = new RegExp(regex.source, regex.flags);

    let m: RegExpExecArray, matchs: (RegExpExecArray|string)[] = [];
    if (regexClone.global) {
        while ((m = regexClone.exec(data)) !== null) {
            if (m.index === regexClone.lastIndex) {
                regexClone.lastIndex++;
            }
            if (m.length > 2) {
                m.shift();
                matchs.push(m);
            } else {
                matchs.push(m[1]);
            }
        }
    } else {
        if (m = regexClone.exec(data)) {
            if (m.length > 2) {
                m.shift();
                matchs.push(m);
            } else {
                matchs.push(m[1]);
            }
        }
    }

    return matchs;
}

function sendNotEnoughParametersAndReturnFalse(regexp: (RegExpExecArray|string)[], channel: string) {
    if (!regexp.length) {
        rtm.sendMessage("Not enough parameters", channel);
        return false;
    } else {
        return true;
    }
}

let actions: BotAction[] = [
    {
        text: "build info",
        regex: /build info ([a-z0-9_]+) ([0-9]+)/i,
        description: "build info JOB_NAME JOB_BUILD_NUMBER : output of the build",
        func: function (slackUser: SlackUser, message: SlackMessage): void {

            let resRegexp = extractRegex(this.regex, message.text);
            if (sendNotEnoughParametersAndReturnFalse(resRegexp, message.channel)) {

                let jobName: string = resRegexp[0][0];
                let jobNumber: string = resRegexp[0][1];

                let options = {
                    name: jobName,
                    number: jobNumber
                };

                jenkinsClient.build.get(options, function (err: Error, data: string) {
                    let msg = "";
                    if (err) {
                        msg += "You got an error : " + err.message + "\n" + err.stack;
                    } else {
                        msg += "Your job " + jobName + " output :\n" + JSON.stringify(data, null, 3);
                    }
                    rtm.sendMessage(msg, message.channel);
                });
            }
        }
    },
    {
        text: "build log",
        regex: /build log ([a-z0-9_]+) ([0-9]+)/i,
        description: "build log JOB_NAME JOB_BUILD_NUMBER : output of the build",
        func: function (slackUser: SlackUser, message: SlackMessage): void {

            let resRegexp = extractRegex(this.regex, message.text);
            if (sendNotEnoughParametersAndReturnFalse(resRegexp, message.channel)) {
                let jobName: string = resRegexp[0][0];
                let jobNumber: string = resRegexp[0][1];

                let options = {
                    name: jobName,
                    number: jobNumber
                };

                jenkinsClient.build.log(options, function (err: Error, data: string) {
                    let msg = "";
                    if (err) {
                        msg += "You got an error : " + err.message + "\n" + err.stack;
                    } else {
                        msg += "Your job " + jobName + " output :\n" + data;
                    }
                    rtm.sendMessage(msg, message.channel);
                });
            }
        }
    },
    {
        text: "build job",
        regex: /build job ([a-z0-9_]+)( with (.*))?/i,
        description: "build job JOB_NAME || build job JOB_NAME with PARAMETERS : build a job with JOB_NAME and optional PARAMETERS",
        func: function (slackUser: SlackUser, message: SlackMessage): void {

            let resRegexp = extractRegex(this.regex, message.text);
            if (sendNotEnoughParametersAndReturnFalse(resRegexp, message.channel)) {
                let jobName: string = resRegexp[0][0];
                let jobParameters: string = resRegexp[0][2];

                let options: any = {name: jobName};
                if (jobParameters) {
                    options["parameters"] = jobParameters;
                }
                jenkinsClient.job.build(options, function (err: Error, jobNumber: string) {
                    let msg = "";
                    if (err) {
                        msg += "You got an error, maybe it does (not) have parameters ... : " + err.message + "\n" + err.stack;
                    } else {
                        msg += "Your job " + jobName + " have been scheduled as number " + jobNumber + "!";
                    }
                    rtm.sendMessage(msg, message.channel);
                });
            }
        }
    },
    {
        text: "job info",
        regex: /job info ([a-z0-9_]+)?/i,
        description: "job info JOB_NAME : a job info with JOB_NAME",
        func: function (slackUser: SlackUser, message: SlackMessage): void {

            let resRegexp = extractRegex(this.regex, message.text);
            if (sendNotEnoughParametersAndReturnFalse(resRegexp, message.channel)) {
                let jobName: string = resRegexp[0] as string;

                jenkinsClient.job.get(jobName, function (err: Error, data: string) {
                    let msg = "";
                    if (err) {
                        msg += "You got an error : " + err.message + "\n" + err.stack;
                    } else {
                        msg += "Job " + jobName + " info :\n" + JSON.stringify(data, null, 3);
                    }
                    rtm.sendMessage(msg, message.channel);
                });
            }
        }
    },
    {
        text: "who are you ?",
        description: "really ?",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            rtm.sendMessage('I am ' + slackUser.real_name + ", you can call me " + slackUser.name, message.channel);
        }
    },
    {
        text: "queue",
        description: "the list of jenkins queue",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            jenkinsClient.queue.list(function (err: any, data: JenkinsQueue[]) {
                let msg = "Queue :\n" + JSON.stringify(data);
                rtm.sendMessage(msg, message.channel);

            });
        }
    },
    {
        text: "jobs",
        description: "the list of jenkins jobs",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            jenkinsClient.job.list(function (err: any, data: JenkinsJob[]) {
                let msg = "Jobs :\n";
                data.forEach(function (job) {
                    msg += job.name + "\n"
                });
                rtm.sendMessage(msg, message.channel);
            });
        }
    },
    {
        text: "help",
        description: "this help",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            let text = "Help :\n";
            _.each(actions, function (action: BotAction) {
                if (action.text !== "" && !action.notVisibleInHelp) {
                    text += "\t - " + action.text + " - " + action.description + "\n";
                }
            });
            rtm.sendMessage(text, message.channel);
        }
    },
    {
        text: "life is too hard",
        description: "reboot myself to forget",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            rtm.sendMessage('Rebooting system ....', message.channel);
            process.exit();
        }
    },
    {
        text: "take this beer",
        description: "give a beer to the bot",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            rtm.sendMessage('<@' + message.user + '> Thanks mate', message.channel);
        }
    },
    {
        text: "take this bear",
        description: "give a bear to the bot",
        notVisibleInHelp: true,
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            rtm.sendMessage('Not that kind of BEER !', message.channel);
        }
    },
    {
        text: "",
        description: "",
        func: function (slackUser: SlackUser, message: SlackMessage): void {
            rtm.sendMessage("I understand what you'are saying <@" + message.user + ">, AND I DON'T CARE !", message.channel);
        }
    }
];


function getAction(user: SlackUser, text: string): BotAction {
    return _.find(actions, function (action: BotAction) {
        let checks = [
            user.name + " " + action.text,
            "<@" + user.id + "> " + action.text,
            user.real_name + " " + action.text
        ];

        return _.some(checks, function (check) {
            return text.indexOf(check) === 0;
        })

    });
}


rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message: SlackMessage) {
    let slackUser: SlackUser = rtm.dataStore.getUserById(rtm.activeUserId);
    if (message.text) {
        let action = getAction(slackUser, message.text);

        if (action) {
            action.func(slackUser, message);
        }
    }
});