import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  //テキスト情報を取得
  const [todoText, setTodoText] = useState("");
  //未完了リストState
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  //完了リストState
  const [completeTodos, setCompleteTodos] = useState([]);

  //テキストが変化したときに動くState
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //追加ボタン押下時
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除ボタン押下時
  const onClickDelete = (index) => {
    const newDeleteTodos = [...incompleteTodos];
    //splice() → 指定したindexの要素を1つ削除する
    newDeleteTodos.splice(index, 1);
    setIncompleteTodos(newDeleteTodos);
  };

  //完了ボタン押下時
  const onClickComplete = (index) => {
    //未完了TODOリストから完了されたTODOを削除する
    const newTodos = [...incompleteTodos];
    //splice() → 指定したindexの要素を1つ削除する
    newTodos.splice(index, 1);

    //完了TODOリストに完了されたTODOを追加する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻すボタン押下時
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までだよ～。早く消化しろ
        </p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
