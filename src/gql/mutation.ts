import { gql } from "@apollo/client";
import { READ_LIST } from "./fragment";

export const ADD_READ_LIST = gql`
  ${READ_LIST}
  mutation AddReadList($link: String!, $title: String!, $isRead: Boolean!) {
    addReadList(link: $link, title: $title, isRead: $isRead) {
      ...ReadList
    }
  }
`;

export const DELETE_READ_LISTS = gql`
  ${READ_LIST}
  mutation DeleteReadLists($ids: [String!]!) {
    deleteReadLists(ids: $ids) {
      ...ReadList
    }
  }
`;