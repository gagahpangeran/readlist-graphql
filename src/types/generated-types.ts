/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddReadList
// ====================================================

export interface AddReadList_addReadList {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

export interface AddReadList {
  addReadList: AddReadList_addReadList;
}

export interface AddReadListVariables {
  link: string;
  title: string;
  isRead: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteReadLists
// ====================================================

export interface DeleteReadLists_deleteReadLists {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

export interface DeleteReadLists {
  deleteReadLists: DeleteReadLists_deleteReadLists[];
}

export interface DeleteReadListsVariables {
  ids: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllReadLists
// ====================================================

export interface GetAllReadLists_allReadLists {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

export interface GetAllReadLists {
  allReadLists: GetAllReadLists_allReadLists[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReadList
// ====================================================

export interface ReadList {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
