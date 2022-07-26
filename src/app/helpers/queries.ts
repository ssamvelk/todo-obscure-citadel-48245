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

export const GET_ONE_CATEGORY = gql`
  query getOneCategories($id: Float!) {
    getOneCategories(id: $id) {
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

export const UPDATE_TODO = gql`
  mutation patchTodo($todo: PatchTodoDTO!) {
    patchTodo(todo: $todo) {
      id
      isCompleted
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($createCategory: CreateCategoryInput!) {
    createCategory(createCategory: $createCategory) {
      title
      id
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo2($todo: CreateTodoInput2!) {
    createTodo2(todo: $todo) {
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
