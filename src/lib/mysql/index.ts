export interface Connection {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    ssh?: SSH
};

export interface SSH {
    host: string,
    port: number,
    username: string
};