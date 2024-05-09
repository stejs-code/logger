import type {EnvGetter, RequestEventBase,} from "@builder.io/qwik-city/middleware/request-handler"
import {Client} from "@elastic/elasticsearch"
import {redis} from "./redis"
import type {RedisClientType} from "redis"
import {isBrowser, isDev} from "@builder.io/qwik/build"
import {User} from "~/app/user/main"
import {type Session} from "~/app/session";

if (isBrowser) console.log("!!ATTENTION CITIZEN!!\n".repeat(30))

export class Context {
    public elastic: Client
    public redis: RedisClientType
    public user?: User
    public session?: Session
    public config: {}

    constructor(ev: Pick<RequestEventBase, "env" | "sharedMap">) {
        this.elastic = Context.initElasticsearch(ev)
        this.redis = redis()

        this.session = ev.sharedMap.get("session")
        this.user = ev.sharedMap.get("user") ?? this.session?.user
        this.config = {}
    }

    // public isAdmin(): boolean {
    //     return this.user?.group.id === 1
    // }

    static initElasticsearch({env}: { env: EnvGetter }) {
        const username = env.get("ELASTIC_USER")
        const password = env.get("ELASTIC_PASSWORD")

        return new Client({
            node: env.get("ELASTIC_URL"),
            auth: password && username ? {password, username} : undefined,
        })
    }
}

export function index<T extends string>(
    indexName: T
): `${"dev-" | ""}${string}` {
    return isDev ? `dev-${indexName}` : indexName
}
