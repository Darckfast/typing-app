import styled from 'styled-components'

export const ConfigContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  height: 50vh;
  width: 50vw;

  label {
    &.property {
      color: white;

      input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid;
        outline: none;
        text-align: center;

        &.value {
          margin: 1em;

          &.number,
          &.string {
            color: #467ade;
          }
        }
      }
    }
  }
`
