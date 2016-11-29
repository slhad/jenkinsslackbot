interface RegExp {
    flags: string;
}

interface SlackMessage {
    type: string;
    channel: string;
    user: string;
    text: string;
    ts: string;
    team: string;
}

interface JenkinsJob {
    color: string;
    name: string;
    url: string;
}

interface SlackProfile {
    bot_id: string;
    api_app_id: string;
    always_active: boolean;
    avatar_hash: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
    image_original: string;
    first_name: string;
    last_name: string;
    title: string;
    real_name: string;
    real_name_normalized: string;
    fields: any;
}

interface SlackPreference {
    highlight_words: string;
    user_colors: string;
    color_names_in_list: boolean;
    growls_enabled: boolean;
    tz: any;
    push_dm_alert: boolean;
    push_mention_alert: boolean;
    msg_replies: string;
    push_everything: boolean;
    push_show_preview: boolean;
    push_idle_wait: number;
    push_sound: string;
    push_loud_channels: string;
    push_mention_channels: string;
    push_loud_channels_set: string;
    email_alerts: string;
    email_alerts_sleep_until: number;
    email_misc: boolean;
    email_weekly: boolean;
    welcome_message_hidden: boolean;
    all_channels_loud: boolean;
    loud_channels: string;
    never_channels: string;
    loud_channels_set: string;
    search_sort: string;
    expand_inline_imgs: boolean;
    expand_internal_inline_imgs: boolean;
    expand_snippets: boolean;
    posts_formatting_guide: boolean;
    seen_welcome_2: boolean;
    seen_ssb_prompt: boolean;
    spaces_new_xp_banner_dismissed: boolean;
    search_only_my_channels: boolean;
    search_only_current_team: boolean;
    emoji_mode: string;
    emoji_use: string;
    has_invited: boolean;
    has_uploaded: boolean;
    has_created_channel: boolean;
    has_searched: boolean;
    search_exclude_channels: string;
    messages_theme: string;
    webapp_spellcheck: boolean;
    no_joined_overlays: boolean;
    no_created_overlays: boolean;
    dropbox_enabled: boolean;
    seen_domain_invite_reminder: boolean;
    seen_member_invite_reminder: boolean;
    mute_sounds: boolean;
    arrow_history: boolean;
    tab_ui_return_selects: boolean;
    obey_inline_img_limit: boolean;
    new_msg_snd: string;
    require_at: boolean;
    ssb_space_window: string;
    mac_ssb_bounce: string;
    mac_ssb_bullet: boolean;
    expand_non_media_attachments: boolean;
    show_typing: boolean;
    pagekeys_handled: boolean;
    last_snippet_type: string;
    display_real_names_override: number;
    display_preferred_names: boolean;
    time24: boolean;
    enter_is_special_in_tbt: boolean;
    graphic_emoticons: boolean;
    convert_emoticons: boolean;
    ss_emojis: boolean;
    sidebar_behavior: string;
    seen_onboarding_start: boolean;
    onboarding_cancelled: boolean;
    seen_onboarding_slackbot_conversation: boolean;
    seen_onboarding_channels: boolean;
    seen_onboarding_direct_messages: boolean;
    seen_onboarding_invites: boolean;
    seen_onboarding_search: boolean;
    seen_onboarding_recent_mentions: boolean;
    seen_onboarding_starred_items: boolean;
    seen_onboarding_private_groups: boolean;
    onboarding_slackbot_conversation_step: number;
    dnd_enabled: boolean;
    dnd_start_hour: string;
    dnd_end_hour: string;
    mark_msgs_read_immediately: boolean;
    start_scroll_at_oldest: boolean;
    snippet_editor_wrap_long_lines: boolean;
    ls_disabled: boolean;
    sidebar_theme: string;
    sidebar_theme_custom_values: string;
    f_key_search: boolean;
    k_key_omnibox: boolean;
    speak_growls: boolean;
    mac_speak_voice: string;
    mac_speak_speed: number;
    comma_key_prefs: boolean;
    at_channel_suppressed_channels: string;
    push_at_channel_suppressed_channels: string;
    prompted_for_email_disabling: boolean;
    full_text_extracts: boolean;
    no_text_in_notifications: boolean;
    muted_channels: string;
    no_macelectron_banner: boolean;
    no_macssb1_banner: boolean;
    no_macssb2_banner: boolean;
    no_winssb1_banner: boolean;
    no_invites_widget_in_sidebar: boolean;
    no_omnibox_in_channels: boolean;
    k_key_omnibox_auto_hide_count: number;
    prev_next_btn: boolean;
    hide_user_group_info_pane: boolean;
    mentions_exclude_at_user_groups: boolean;
    privacy_policy_seen: boolean;
    enterprise_migration_seen: boolean;
    last_tos_acknowledged: any;
    search_exclude_bots: boolean;
    load_lato_2: boolean;
    fuller_timestamps: boolean;
    last_seen_at_channel_warning: number;
    flex_resize_window: boolean;
    msg_preview: boolean;
    msg_preview_persistent: boolean;
    emoji_autocomplete_big: boolean;
    winssb_run_from_tray: boolean;
    winssb_window_flash_behavior: string;
    two_factor_auth_enabled: boolean;
    two_factor_type: any;
    two_factor_backup_type: any;
    client_logs_pri: string;
    enhanced_debugging: boolean;
    flannel_lazy_members: boolean;
    flannel_server_pool: string;
    mentions_exclude_at_channels: boolean;
    confirm_clear_all_unreads: boolean;
    confirm_user_marked_away: boolean;
    box_enabled: boolean;
    seen_single_emoji_msg: boolean;
    confirm_sh_call_start: boolean;
    preferred_skin_tone: string;
    show_all_skin_tones: boolean;
    separate_private_channels: boolean;
    whats_new_read: number;
    hotness: boolean;
    frecency_jumper: string;
    frecency_ent_jumper: string;
    jumbomoji: boolean;
    no_flex_in_history: boolean;
    newxp_seen_last_message: number;
    attachments_with_borders: boolean;
    show_memory_instrument: boolean;
    enable_unread_view: boolean;
    seen_unread_view_coachmark: boolean;
    seen_calls_video_beta_coachmark: boolean;
    measure_css_usage: boolean;
    seen_replies_coachmark: boolean;
    all_unreads_sort_order: string;
    locale: string;
    gdrive_authed: boolean;
    gdrive_enabled: boolean;
    seen_gdrive_coachmark: boolean;
    channel_sort: string;
    overloaded_message_enabled: boolean;
    a11y_font_size: string;
    a11y_animations: boolean;
    intro_to_apps_message_seen: boolean;
}

interface SlackUser {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    status: any;
    color: string;
    real_name: string;
    tz: any;
    tz_label: string;
    tz_offset: number;
    profile: SlackProfile;
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    presence: string;
    prefs: SlackPreference;
    created: number;
    manual_presence: string;
}

interface BotAction {
    text: string;
    description: string;
    regex?: RegExp;
    func(slackUser: SlackUser, message: SlackMessage): void;
}

interface JenkinsTask {
    color: string;
    name: string;
    url: string;
}

interface JenkinsActionCause {
    shortDescription: string;
    userId: string;
    userName: string;
}

interface JenkinsAction {
    causes: JenkinsActionCause[];
}

interface JenkinsQueue {

    actions: JenkinsAction[];
    blocked: boolean;
    buildable: boolean;
    buildableStartMilliseconds: number;
    id: number;
    inQueueSince: number;
    params: string;
    stuck: boolean;
    task: JenkinsTask;
    url: string;
    why: string;
}

interface JenkinsQueueData {
    items: JenkinsQueue[];
}