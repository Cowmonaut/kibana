/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { fork } from 'redux-saga/effects';

import { watchBlame, watchLoadBlame } from './blame';
import { watchLoadCommit } from './commit';
import {
  watchCloseReference,
  watchLoadRepo,
  watchLspMethods,
  watchMainRouteChange,
} from './editor';
import { watchFetchBranchesAndCommits, watchFetchRepoTree, watchRepoRouteChange } from './file';
import { watchInstallLanguageServer, watchLoadLanguageServers } from './language_server';
import { watchLoadConfigs, watchSwitchProjectLanguageServer } from './project_config';
import { watchLoadStatus } from './project_status';
import {
  watchAdminRouteChange,
  watchDeleteRepo,
  watchFetchRepoConfigs,
  watchFetchRepos,
  watchGotoRepo,
  watchImportRepo,
  watchIndexRepo,
  watchInitRepoCmd,
} from './repository';
import { watchDocumentSearch, watchRepositorySearch, watchSearchRouteChange } from './search';
import { watchRepoCloneSuccess, watchRepoDeleteFinished } from './status';
import { watchLoadStructure } from './structure';
import { watchLoadUserConfig } from './user';

export function* rootSaga() {
  yield fork(watchFetchRepos);
  yield fork(watchDeleteRepo);
  yield fork(watchIndexRepo);
  yield fork(watchImportRepo);
  yield fork(watchFetchRepoTree);
  yield fork(watchFetchBranchesAndCommits);
  yield fork(watchDocumentSearch);
  yield fork(watchRepositorySearch);
  yield fork(watchLoadStructure);
  yield fork(watchLspMethods);
  yield fork(watchCloseReference);
  yield fork(watchFetchRepoConfigs);
  yield fork(watchInitRepoCmd);
  yield fork(watchGotoRepo);
  yield fork(watchLoadRepo);
  yield fork(watchLoadUserConfig);
  yield fork(watchLoadCommit);
  yield fork(watchSearchRouteChange);
  yield fork(watchAdminRouteChange);
  yield fork(watchMainRouteChange);
  yield fork(watchLoadRepo);
  yield fork(watchRepoRouteChange);
  yield fork(watchLoadBlame);
  yield fork(watchBlame);
  yield fork(watchRepoCloneSuccess);
  yield fork(watchRepoDeleteFinished);
  yield fork(watchLoadLanguageServers);
  yield fork(watchInstallLanguageServer);
  yield fork(watchSwitchProjectLanguageServer);
  yield fork(watchLoadConfigs);
  yield fork(watchLoadStatus);
}