interface WebsiteConf {
    scheme?: string;
    host?: string;
    port?: number;
}

class Website {
    public scheme: string;
    public host: string;
    public port: number;

    constructor(conf: WebsiteConf) {
        this.scheme = conf.scheme || 'http';
        this.host = conf.host || 'localhost';
        this.port =  conf.port || 9527;
    }

    public getUrl(): string {
        return `${this.scheme}://${this.host}:${this.port}`;
    }
}

export default Website;