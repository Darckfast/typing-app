import React, { useEffect, useState } from 'react'
import { Container } from '../../styles/global'
import Link from 'next/link'
import { ReturnIcon } from '../../styles/icons/returnIcon'
import { ConfigContainer } from '../../styles/pages/Configs'
import { ButtonsContainer } from '../../styles/pages/Home'
import { Configuration } from '../../utils/Configuration'
import CheckBox from '../../components/Checkbox'

const Config: React.FC = () => {
  const [config, setConfig] = useState({})

  useEffect(() => {
    setConfig(() => Configuration.getInstance().getAll())
  }, [])

  const updateValue = ({
    name,
    value,
    checked,
    type
  }: {
    name: string
    value: number | string | boolean
    checked: boolean
    type: string
  }) => {
    console.log(value, checked, type)
    setConfig(config => {
      const changedConfig = {
        ...config,
        [name]: type === 'checkbox' ? checked : value
      }
      console.log(name, changedConfig[name])
      Configuration.getInstance().update(name, changedConfig[name])

      return changedConfig
    })
  }

  const createElement = (key: string, index: number) => {
    const value = config[key]
    if (typeof value === 'boolean') {
      return (
        <CheckBox
          value={value}
          label={`${key}:`}
          name={key}
          onChangeValue={e => updateValue(e.target)}
        ></CheckBox>
      )
    } else {
      return (
        <label key={index} className="property">
          {key}:
          {
            <input
              type="text"
              name={key}
              value={config[key]}
              className={`value ${typeof config[key]}`}
              onChange={e => updateValue(e.target)}
            />
          }
        </label>
      )
    }
  }

  return (
    <Container>
      <ConfigContainer>
        {Object.keys(config).map((key, index) => createElement(key, index))}
        <ButtonsContainer>
          <Link href="/">
            <a>
              <ReturnIcon className="icon no-rotate"></ReturnIcon>
            </a>
          </Link>
        </ButtonsContainer>
      </ConfigContainer>
    </Container>
  )
}

export default Config
