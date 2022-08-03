import { gql } from 'apollo-angular';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      title
      todos {
        id
        text
        isCompleted
      }
    }
  }
`;

export const CREATE_CATEGORY_AND_TODO = gql`
  mutation createCategoryAndTodo(
    $createCategory: CreateCategoryInput!
    $todo: CreateTodoInput!
  ) {
    createCategory(createCategory: $createCategory) {
      id
      title
    }

    createTodo(todo: $todo) {
      id
      text
      isCompleted
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: Float!) {
    removeCategory(id: $id)
  }
`;

export const GET_TODOS = gql`
  query {
    getAllTodos {
      id
      text
      isCompleted
      category {
        title
      }
    }
  }
`;

export const GET_ONE_TODO = gql`
  query getOneTodo($id: Float!) {
    getOneTodo(id: $id) {
      id
      text
      isCompleted
      category {
        title
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($todo: CreateTodoInput!) {
    createTodo(todo: $todo) {
      id
      text
      isCompleted
      category {
        id
        title
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($todo: UpdateTodoInput!) {
    updateTodo(todo: $todo) {
      id
      isCompleted
      text
      category {
        id
      }
    }
  }
`;
