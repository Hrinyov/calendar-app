import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/store";
import { SearchResult } from "./search-tasks.types";

const SearchWrapper = styled.div`
  position: relative;
  max-width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #ffffffe3;
  border: none;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  position: absolute;
  width: 120%;
  z-index: 1;
  border: 1px solid #ccc;
`;

const ResultItem = styled.li<{ color: string }>`
  padding: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;

  &:last-child {
    border-bottom: none;
  }

  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
  }
`;

export const SearchTasks: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult>([]);

  const tasksState = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const searchResults: SearchResult = [];
      Object.keys(tasksState).forEach((date) => {
        const tasks = tasksState[date].filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        tasks.forEach((task) => searchResults.push({ ...task, date }));
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchTerm, tasksState]);

  return (
    <SearchWrapper>
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {results.length > 0 && (
        <ResultList>
          {results.map((task) => (
            <ResultItem key={task.id} color={task.color}>
              {task.date}: {task.title}
            </ResultItem>
          ))}
        </ResultList>
      )}
    </SearchWrapper>
  );
};
