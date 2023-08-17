
export type SaveSetting = { settingsName: SupportedSettings, value: any };

export type SupportedSettings = "currency" | "categories";

export type Setting = {
    key: string,
    data: string
}

