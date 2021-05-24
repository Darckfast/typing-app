import styled from 'styled-components'

export const InputBox = styled.input`
  height: 0vh;
  width: 0vw;
  margin: 0;
  outline: none;
  border: none;
  display: block;
`

export const MainContainer = styled.main<{ smooth?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  height: 50vh;
  width: 50vw;
  border-radius: 4px;

  div {
    width: 90%;
    font-size: 1.8rem;
    line-height: 2em;

    display: flex;
    flex-wrap: wrap;

    span,
    s {
      // transition: 0.2s;
      transition: ${props => (props.smooth ? '0.2s' : 'none')};

      &.word {
        margin: 0.37rem;
        color: #616161;
      }

      &.current {
        color: #2cc7e0;
      }

      &.typed {
        position: relative;
        color: #fefefe;

        &.wrong {
          color: #da2e36;
        }

        &.input {
          position: absolute;
          font-size: 18px;
          left: 12.5%;
          bottom: 80%;
          color: #227df5;
          line-height: normal;
        }
      }
    }
  }
`

export const ToggleLabel = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // margin: 1em;

  input {
    display: none;
  }

  input:checked + svg {
    fill: #e1e1e6;

    circle {
      fill: #121214;
    }
  }

  svg {
    cursor: pointer;
    margin-left: 1em;
    transition: 0.2s;

    circle {
      transition: 0.2s;
      fill: #e1e1e6;
    }

    path {
      transition: 0.2s;
      stroke: #e1e1e6;
    }
  }
`

export const ButtonsContainer = styled.div`
  align-items: center;
  justify-content: center;

  a {
    cursor: pointer;
    margin: 0.5rem;
    outline: none;

    .icon {
      transition: 0.2s;
      fill: #292929;
    }

    &:hover,
    &:active,
    &:focus {
      .icon {
        &.no-rotate {
          transform: none;
        }

        transform: rotate(90deg);
        fill: white;
      }
    }
  }
`
