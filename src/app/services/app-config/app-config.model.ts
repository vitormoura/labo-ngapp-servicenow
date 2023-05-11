export interface IServiceNowConfigSection {
    requireAuth: boolean,
    clientId: string,
    instanceUrl: string,
    apiNamespace: string
}

export interface IAppConfig {
    serviceNow: IServiceNowConfigSection
}