/* tslint:disable */
/*
     * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
     * or more contributor license agreements. Licensed under the Elastic License;
     * you may not use this file except in compliance with the Elastic License.
     */

import { GraphQLResolveInfo } from 'graphql';

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<Result, Parent = any, Context = any, Args = any> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export interface Query {
  source: Source /** Get a security data source by id */;
  allSources: Source[] /** Get a list of all security data sources */;
}

export interface Source {
  id: string /** The id of the source */;
  configuration: SourceConfiguration /** The raw configuration of the source */;
  status: SourceStatus /** The status of the source */;
  getEvents?: EventsData | null /** Gets Suricata events based on timerange and specified criteria, or all events in the timerange if no criteria is specified */;
  Hosts: HostsData /** Gets Hosts based on timerange and specified criteria, or all events in the timerange if no criteria is specified */;
  UncommonProcesses: UncommonProcessesData /** Gets UncommonProcesses based on a timerange, or all UncommonProcesses if no criteria is specified */;
  whoAmI?: SayMyName | null /** Just a simple example to get the app name */;
}
/** A set of configuration options for a security data source */
export interface SourceConfiguration {
  logAlias: string /** The alias to read file data from */;
  auditbeatAlias: string /** The alias to read auditbeat data from */;
  fields: SourceFields /** The field mapping to use for this source */;
}
/** A mapping of semantic fields to their document counterparts */
export interface SourceFields {
  container: string /** The field to identify a container by */;
  host: string /** The fields to identify a host by */;
  message: string[] /** The fields that may contain the log event message. The first field found win. */;
  pod: string /** The field to identify a pod by */;
  tiebreaker: string /** The field to use as a tiebreaker for log events that have identical timestamps */;
  timestamp: string /** The field to use as a timestamp for metrics and logs */;
}
/** The status of an infrastructure data source */
export interface SourceStatus {
  auditbeatAliasExists: boolean /** Whether the configured auditbeat alias exists */;
  auditbeatIndicesExist: boolean /** Whether the configured alias or wildcard pattern resolve to any auditbeat indices */;
  auditbeatIndices: string[] /** The list of indices in the auditbeat alias */;
  indexFields: IndexField[] /** The list of fields defined in the index mappings */;
}
/** A descriptor of a field in an index */
export interface IndexField {
  name: string /** The name of the field */;
  type: string /** The type of the field's values as recognized by Kibana */;
  searchable: boolean /** Whether the field's values can be efficiently searched for */;
  aggregatable: boolean /** Whether the field's values can be aggregated */;
}

export interface EventsData {
  kpiEventType: KpiItem[];
  events: EventItem[];
}

export interface KpiItem {
  value: string;
  count: number;
}

export interface EventItem {
  _id?: string | null;
  destination?: DestinationEcsFields | null;
  event?: EventEcsFields | null;
  geo?: GeoEcsFields | null;
  host?: HostEcsFields | null;
  source?: SourceEcsFields | null;
  suricata?: SuricataEcsFields | null;
  timestamp?: string | null;
}

export interface DestinationEcsFields {
  ip?: string | null;
  port?: number | null;
}

export interface EventEcsFields {
  category?: string | null;
  id?: number | null;
  module?: string | null;
  severity?: number | null;
  type?: string | null;
}

export interface GeoEcsFields {
  country_iso_code?: string | null;
  region_name?: string | null;
}

export interface HostEcsFields {
  hostname?: string | null;
  ip?: string | null;
}

export interface SourceEcsFields {
  ip?: string | null;
  port?: number | null;
}

export interface SuricataEcsFields {
  eve?: SuricataEveData | null;
}

export interface SuricataEveData {
  alert?: SuricataAlertData | null;
  flow_id?: number | null;
  proto?: string | null;
}

export interface SuricataAlertData {
  signature?: string | null;
  signature_id?: number | null;
}

export interface HostsData {
  edges: HostsEdges[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface HostsEdges extends Record<string, {}> {
  host: HostItem;
  cursor: CursorType;
}

export interface HostItem {
  _id?: string | null;
  name?: string | null;
  firstSeen?: string | null;
  version?: string | null;
  os?: string | null;
}

export interface CursorType {
  value: string;
  tiebreaker?: string | null;
}

export interface PageInfo {
  endCursor?: CursorType | null;
  hasNextPage?: boolean | null;
}

export interface UncommonProcessesData {
  edges: UncommonProcessesEdges[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface UncommonProcessesEdges extends Record<string, {}> {
  uncommonProcess: UncommonProcessItem;
  cursor: CursorType;
}

export interface UncommonProcessItem {
  _id: string;
  name: string;
  title?: string | null;
  instances: number;
  hosts?: (string | null)[] | null;
}

export interface SayMyName {
  appName: string /** The id of the source */;
}

export interface TimerangeInput {
  interval: string /** The interval string to use for last bucket. The format is '{value}{unit}'. For example '5m' would return the metrics for the last 5 minutes of the timespan. */;
  to: number /** The end of the timerange */;
  from: number /** The beginning of the timerange */;
}

export interface PaginationInput {
  limit: number /** The limit parameter allows you to configure the maximum amount of items to be returned */;
  cursor?: string | null /** The cursor parameter defines the next result you want to fetch */;
  tiebreaker?:
    | string
    | null /** The tiebreaker parameter allow to be more precise to fetch the next item */;
}
export interface SourceQueryArgs {
  id: string /** The id of the source */;
}
export interface GetEventsSourceArgs {
  timerange: TimerangeInput;
  filterQuery?: string | null;
}
export interface HostsSourceArgs {
  timerange: TimerangeInput;
  pagination: PaginationInput;
  filterQuery?: string | null;
}
export interface UncommonProcessesSourceArgs {
  timerange: TimerangeInput;
  pagination: PaginationInput;
  filterQuery?: string | null;
}
export interface IndexFieldsSourceStatusArgs {
  indexType?: IndexType | null;
}

export enum IndexType {
  ANY = 'ANY',
  LOGS = 'LOGS',
  AUDITBEAT = 'AUDITBEAT',
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    source?: SourceResolver<Source, any, Context> /** Get a security data source by id */;
    allSources?: AllSourcesResolver<
      Source[],
      any,
      Context
    > /** Get a list of all security data sources */;
  }

  export type SourceResolver<R = Source, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    SourceArgs
  >;
  export interface SourceArgs {
    id: string /** The id of the source */;
  }

  export type AllSourcesResolver<R = Source[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SourceResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context> /** The id of the source */;
    configuration?: ConfigurationResolver<
      SourceConfiguration,
      any,
      Context
    > /** The raw configuration of the source */;
    status?: StatusResolver<SourceStatus, any, Context> /** The status of the source */;
    getEvents?: GetEventsResolver<
      EventsData | null,
      any,
      Context
    > /** Gets Suricata events based on timerange and specified criteria, or all events in the timerange if no criteria is specified */;
    Hosts?: HostsResolver<
      HostsData,
      any,
      Context
    > /** Gets Hosts based on timerange and specified criteria, or all events in the timerange if no criteria is specified */;
    UncommonProcesses?: UncommonProcessesResolver<
      UncommonProcessesData,
      any,
      Context
    > /** Gets UncommonProcesses based on a timerange, or all UncommonProcesses if no criteria is specified */;
    whoAmI?: WhoAmIResolver<
      SayMyName | null,
      any,
      Context
    > /** Just a simple example to get the app name */;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type ConfigurationResolver<
    R = SourceConfiguration,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type StatusResolver<R = SourceStatus, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GetEventsResolver<R = EventsData | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    GetEventsArgs
  >;
  export interface GetEventsArgs {
    timerange: TimerangeInput;
    filterQuery?: string | null;
  }

  export type HostsResolver<R = HostsData, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    HostsArgs
  >;
  export interface HostsArgs {
    timerange: TimerangeInput;
    pagination: PaginationInput;
    filterQuery?: string | null;
  }

  export type UncommonProcessesResolver<
    R = UncommonProcessesData,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UncommonProcessesArgs>;
  export interface UncommonProcessesArgs {
    timerange: TimerangeInput;
    pagination: PaginationInput;
    filterQuery?: string | null;
  }

  export type WhoAmIResolver<R = SayMyName | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}
/** A set of configuration options for a security data source */
export namespace SourceConfigurationResolvers {
  export interface Resolvers<Context = any> {
    logAlias?: LogAliasResolver<string, any, Context> /** The alias to read file data from */;
    auditbeatAlias?: AuditbeatAliasResolver<
      string,
      any,
      Context
    > /** The alias to read auditbeat data from */;
    fields?: FieldsResolver<
      SourceFields,
      any,
      Context
    > /** The field mapping to use for this source */;
  }

  export type LogAliasResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AuditbeatAliasResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FieldsResolver<R = SourceFields, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}
/** A mapping of semantic fields to their document counterparts */
export namespace SourceFieldsResolvers {
  export interface Resolvers<Context = any> {
    container?: ContainerResolver<string, any, Context> /** The field to identify a container by */;
    host?: HostResolver<string, any, Context> /** The fields to identify a host by */;
    message?: MessageResolver<
      string[],
      any,
      Context
    > /** The fields that may contain the log event message. The first field found win. */;
    pod?: PodResolver<string, any, Context> /** The field to identify a pod by */;
    tiebreaker?: TiebreakerResolver<
      string,
      any,
      Context
    > /** The field to use as a tiebreaker for log events that have identical timestamps */;
    timestamp?: TimestampResolver<
      string,
      any,
      Context
    > /** The field to use as a timestamp for metrics and logs */;
  }

  export type ContainerResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type HostResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type MessageResolver<R = string[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PodResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type TiebreakerResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TimestampResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}
/** The status of an infrastructure data source */
export namespace SourceStatusResolvers {
  export interface Resolvers<Context = any> {
    auditbeatAliasExists?: AuditbeatAliasExistsResolver<
      boolean,
      any,
      Context
    > /** Whether the configured auditbeat alias exists */;
    auditbeatIndicesExist?: AuditbeatIndicesExistResolver<
      boolean,
      any,
      Context
    > /** Whether the configured alias or wildcard pattern resolve to any auditbeat indices */;
    auditbeatIndices?: AuditbeatIndicesResolver<
      string[],
      any,
      Context
    > /** The list of indices in the auditbeat alias */;
    indexFields?: IndexFieldsResolver<
      IndexField[],
      any,
      Context
    > /** The list of fields defined in the index mappings */;
  }

  export type AuditbeatAliasExistsResolver<R = boolean, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AuditbeatIndicesExistResolver<R = boolean, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AuditbeatIndicesResolver<R = string[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IndexFieldsResolver<R = IndexField[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    IndexFieldsArgs
  >;
  export interface IndexFieldsArgs {
    indexType?: IndexType | null;
  }
}
/** A descriptor of a field in an index */
export namespace IndexFieldResolvers {
  export interface Resolvers<Context = any> {
    name?: NameResolver<string, any, Context> /** The name of the field */;
    type?: TypeResolver<
      string,
      any,
      Context
    > /** The type of the field's values as recognized by Kibana */;
    searchable?: SearchableResolver<
      boolean,
      any,
      Context
    > /** Whether the field's values can be efficiently searched for */;
    aggregatable?: AggregatableResolver<
      boolean,
      any,
      Context
    > /** Whether the field's values can be aggregated */;
  }

  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type TypeResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type SearchableResolver<R = boolean, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AggregatableResolver<R = boolean, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace EventsDataResolvers {
  export interface Resolvers<Context = any> {
    kpiEventType?: KpiEventTypeResolver<KpiItem[], any, Context>;
    events?: EventsResolver<EventItem[], any, Context>;
  }

  export type KpiEventTypeResolver<R = KpiItem[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EventsResolver<R = EventItem[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace KpiItemResolvers {
  export interface Resolvers<Context = any> {
    value?: ValueResolver<string, any, Context>;
    count?: CountResolver<number, any, Context>;
  }

  export type ValueResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type CountResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
}

export namespace EventItemResolvers {
  export interface Resolvers<Context = any> {
    _id?: IdResolver<string | null, any, Context>;
    destination?: DestinationResolver<DestinationEcsFields | null, any, Context>;
    event?: EventResolver<EventEcsFields | null, any, Context>;
    geo?: GeoResolver<GeoEcsFields | null, any, Context>;
    host?: HostResolver<HostEcsFields | null, any, Context>;
    source?: SourceResolver<SourceEcsFields | null, any, Context>;
    suricata?: SuricataResolver<SuricataEcsFields | null, any, Context>;
    timestamp?: TimestampResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DestinationResolver<
    R = DestinationEcsFields | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EventResolver<R = EventEcsFields | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GeoResolver<R = GeoEcsFields | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type HostResolver<R = HostEcsFields | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SourceResolver<R = SourceEcsFields | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SuricataResolver<
    R = SuricataEcsFields | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TimestampResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace DestinationEcsFieldsResolvers {
  export interface Resolvers<Context = any> {
    ip?: IpResolver<string | null, any, Context>;
    port?: PortResolver<number | null, any, Context>;
  }

  export type IpResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PortResolver<R = number | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace EventEcsFieldsResolvers {
  export interface Resolvers<Context = any> {
    category?: CategoryResolver<string | null, any, Context>;
    id?: IdResolver<number | null, any, Context>;
    module?: ModuleResolver<string | null, any, Context>;
    severity?: SeverityResolver<number | null, any, Context>;
    type?: TypeResolver<string | null, any, Context>;
  }

  export type CategoryResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IdResolver<R = number | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ModuleResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SeverityResolver<R = number | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace GeoEcsFieldsResolvers {
  export interface Resolvers<Context = any> {
    country_iso_code?: CountryIsoCodeResolver<string | null, any, Context>;
    region_name?: RegionNameResolver<string | null, any, Context>;
  }

  export type CountryIsoCodeResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type RegionNameResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace HostEcsFieldsResolvers {
  export interface Resolvers<Context = any> {
    hostname?: HostnameResolver<string | null, any, Context>;
    ip?: IpResolver<string | null, any, Context>;
  }

  export type HostnameResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IpResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SourceEcsFieldsResolvers {
  export interface Resolvers<Context = any> {
    ip?: IpResolver<string | null, any, Context>;
    port?: PortResolver<number | null, any, Context>;
  }

  export type IpResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PortResolver<R = number | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SuricataEcsFieldsResolvers {
  export interface Resolvers<Context = any> {
    eve?: EveResolver<SuricataEveData | null, any, Context>;
  }

  export type EveResolver<R = SuricataEveData | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SuricataEveDataResolvers {
  export interface Resolvers<Context = any> {
    alert?: AlertResolver<SuricataAlertData | null, any, Context>;
    flow_id?: FlowIdResolver<number | null, any, Context>;
    proto?: ProtoResolver<string | null, any, Context>;
  }

  export type AlertResolver<R = SuricataAlertData | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FlowIdResolver<R = number | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ProtoResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SuricataAlertDataResolvers {
  export interface Resolvers<Context = any> {
    signature?: SignatureResolver<string | null, any, Context>;
    signature_id?: SignatureIdResolver<number | null, any, Context>;
  }

  export type SignatureResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SignatureIdResolver<R = number | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace HostsDataResolvers {
  export interface Resolvers<Context = any> {
    edges?: EdgesResolver<HostsEdges[], any, Context>;
    totalCount?: TotalCountResolver<number, any, Context>;
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
  }

  export type EdgesResolver<R = HostsEdges[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TotalCountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PageInfoResolver<R = PageInfo, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace HostsEdgesResolvers {
  export interface Resolvers<Context = any> {
    host?: HostResolver<HostItem, any, Context>;
    cursor?: CursorResolver<CursorType, any, Context>;
  }

  export type HostResolver<R = HostItem, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CursorResolver<R = CursorType, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace HostItemResolvers {
  export interface Resolvers<Context = any> {
    _id?: IdResolver<string | null, any, Context>;
    name?: NameResolver<string | null, any, Context>;
    firstSeen?: FirstSeenResolver<string | null, any, Context>;
    version?: VersionResolver<string | null, any, Context>;
    os?: OsResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FirstSeenResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type VersionResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OsResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace CursorTypeResolvers {
  export interface Resolvers<Context = any> {
    value?: ValueResolver<string, any, Context>;
    tiebreaker?: TiebreakerResolver<string | null, any, Context>;
  }

  export type ValueResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type TiebreakerResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace PageInfoResolvers {
  export interface Resolvers<Context = any> {
    endCursor?: EndCursorResolver<CursorType | null, any, Context>;
    hasNextPage?: HasNextPageResolver<boolean | null, any, Context>;
  }

  export type EndCursorResolver<R = CursorType | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type HasNextPageResolver<R = boolean | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UncommonProcessesDataResolvers {
  export interface Resolvers<Context = any> {
    edges?: EdgesResolver<UncommonProcessesEdges[], any, Context>;
    totalCount?: TotalCountResolver<number, any, Context>;
    pageInfo?: PageInfoResolver<PageInfo, any, Context>;
  }

  export type EdgesResolver<R = UncommonProcessesEdges[], Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TotalCountResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PageInfoResolver<R = PageInfo, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UncommonProcessesEdgesResolvers {
  export interface Resolvers<Context = any> {
    uncommonProcess?: UncommonProcessResolver<UncommonProcessItem, any, Context>;
    cursor?: CursorResolver<CursorType, any, Context>;
  }

  export type UncommonProcessResolver<
    R = UncommonProcessItem,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CursorResolver<R = CursorType, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UncommonProcessItemResolvers {
  export interface Resolvers<Context = any> {
    _id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    title?: TitleResolver<string | null, any, Context>;
    instances?: InstancesResolver<number, any, Context>;
    hosts?: HostsResolver<(string | null)[] | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
  export type TitleResolver<R = string | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type InstancesResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type HostsResolver<R = (string | null)[] | null, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace SayMyNameResolvers {
  export interface Resolvers<Context = any> {
    appName?: AppNameResolver<string, any, Context> /** The id of the source */;
  }

  export type AppNameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace GetEventsQuery {
  export type Variables = {
    sourceId: string;
    timerange: TimerangeInput;
    filterQuery?: string | null;
  };

  export type Query = {
    __typename?: 'Query';
    source: Source;
  };

  export type Source = {
    __typename?: 'Source';
    id: string;
    getEvents?: GetEvents | null;
  };

  export type GetEvents = {
    __typename?: 'EventsData';
    events: Events[];
    kpiEventType: KpiEventType[];
  };

  export type Events = {
    __typename?: 'EventItem';
    _id?: string | null;
    timestamp?: string | null;
    event?: Event | null;
    host?: Host | null;
    source?: _Source | null;
    destination?: Destination | null;
    geo?: Geo | null;
    suricata?: Suricata | null;
  };

  export type Event = {
    __typename?: 'EventEcsFields';
    type?: string | null;
    severity?: number | null;
    module?: string | null;
    category?: string | null;
    id?: number | null;
  };

  export type Host = {
    __typename?: 'HostEcsFields';
    hostname?: string | null;
    ip?: string | null;
  };

  export type _Source = {
    __typename?: 'SourceEcsFields';
    ip?: string | null;
    port?: number | null;
  };

  export type Destination = {
    __typename?: 'DestinationEcsFields';
    ip?: string | null;
    port?: number | null;
  };

  export type Geo = {
    __typename?: 'GeoEcsFields';
    region_name?: string | null;
    country_iso_code?: string | null;
  };

  export type Suricata = {
    __typename?: 'SuricataEcsFields';
    eve?: Eve | null;
  };

  export type Eve = {
    __typename?: 'SuricataEveData';
    proto?: string | null;
    flow_id?: number | null;
    alert?: Alert | null;
  };

  export type Alert = {
    __typename?: 'SuricataAlertData';
    signature?: string | null;
    signature_id?: number | null;
  };

  export type KpiEventType = {
    __typename?: 'KpiItem';
    value: string;
    count: number;
  };
}

export namespace GetHostsQuery {
  export type Variables = {
    sourceId: string;
    timerange: TimerangeInput;
    pagination: PaginationInput;
    filterQuery?: string | null;
  };

  export type Query = {
    __typename?: 'Query';
    source: Source;
  };

  export type Source = {
    __typename?: 'Source';
    id: string;
    Hosts: Hosts;
  };

  export type Hosts = {
    __typename?: 'HostsData';
    totalCount: number;
    edges: Edges[];
    pageInfo: PageInfo;
  };

  export type Edges = {
    __typename?: 'HostsEdges';
    host: Host;
    cursor: Cursor;
  };

  export type Host = {
    __typename?: 'HostItem';
    _id?: string | null;
    name?: string | null;
    os?: string | null;
    version?: string | null;
    firstSeen?: string | null;
  };

  export type Cursor = {
    __typename?: 'CursorType';
    value: string;
  };

  export type PageInfo = {
    __typename?: 'PageInfo';
    endCursor?: EndCursor | null;
    hasNextPage?: boolean | null;
  };

  export type EndCursor = {
    __typename?: 'CursorType';
    value: string;
  };
}

export namespace SourceQuery {
  export type Variables = {
    sourceId?: string | null;
  };

  export type Query = {
    __typename?: 'Query';
    source: Source;
  };

  export type Source = {
    __typename?: 'Source';
    id: string;
    configuration: Configuration;
    status: Status;
  };

  export type Configuration = {
    __typename?: 'SourceConfiguration';
    auditbeatAlias: string;
    logAlias: string;
  };

  export type Status = {
    __typename?: 'SourceStatus';
    auditbeatIndicesExist: boolean;
    auditbeatAliasExists: boolean;
    auditbeatIndices: string[];
    indexFields: IndexFields[];
  };

  export type IndexFields = {
    __typename?: 'IndexField';
    name: string;
    searchable: boolean;
    type: string;
    aggregatable: boolean;
  };
}

export namespace GetUncommonProcessesQuery {
  export type Variables = {
    sourceId: string;
    timerange: TimerangeInput;
    pagination: PaginationInput;
    filterQuery?: string | null;
  };

  export type Query = {
    __typename?: 'Query';
    source: Source;
  };

  export type Source = {
    __typename?: 'Source';
    id: string;
    UncommonProcesses: UncommonProcesses;
  };

  export type UncommonProcesses = {
    __typename?: 'UncommonProcessesData';
    totalCount: number;
    edges: Edges[];
    pageInfo: PageInfo;
  };

  export type Edges = {
    __typename?: 'UncommonProcessesEdges';
    uncommonProcess: UncommonProcess;
    cursor: Cursor;
  };

  export type UncommonProcess = {
    __typename?: 'UncommonProcessItem';
    _id: string;
    name: string;
    title?: string | null;
    instances: number;
    hosts?: (string | null)[] | null;
  };

  export type Cursor = {
    __typename?: 'CursorType';
    value: string;
  };

  export type PageInfo = {
    __typename?: 'PageInfo';
    endCursor?: EndCursor | null;
    hasNextPage?: boolean | null;
  };

  export type EndCursor = {
    __typename?: 'CursorType';
    value: string;
  };
}

export namespace WhoAmIQuery {
  export type Variables = {
    sourceId: string;
  };

  export type Query = {
    __typename?: 'Query';
    source: Source;
  };

  export type Source = {
    __typename?: 'Source';
    whoAmI?: WhoAmI | null;
  };

  export type WhoAmI = {
    __typename?: 'SayMyName';
    appName: string;
  };
}