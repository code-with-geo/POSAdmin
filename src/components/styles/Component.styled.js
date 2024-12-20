import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  padding: ${(props) => props.padding};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  text-decoration: none;
  border: none;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverbgColor};
    color: ${(props) => props.hoverColor};

    transition: 0.3s ease;
  }
`;

export const PageLink = styled(Link)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  padding: ${(props) => props.padding};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  text-decoration: none;
  border: none;
  transition: 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.hoverbgColor};
    color: ${(props) => props.hoverColor};

    transition: 0.3s ease;
  }
`;

export const TextBox = styled.input`
  height: ${(props) => props.height}; //40px;
  width: ${(props) => props.width}; //250px;
  line-height: 2;
  padding: 0 0.5rem;
  border: 2px solid transparent;
  border-radius: 5px;
  outline: none;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.7);
  transition: 0.3s ease;
  border-color: #e2e8ec;
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};

  font-size: ${(props) => props.fontSize};
  &::placeholder {
    color: #9e9ea7;
  }

  &:focus {
    outline: none;
    border-color: #697565;
    background-color: #fff;
  }

  &:hover {
    border-color: #697565;
  }
`;
