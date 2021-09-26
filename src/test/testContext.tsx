import React, { Provider, useContext, useState } from 'react'

const TestContext = createThemeContext()

interface ThemeContextState {
  name: string;
  toggle: () => void;
}

function createThemeContext (): React.Context<ThemeContextState> {
  const context = React.createContext<ThemeContextState>({
    name: 'dark',
    toggle: () => {}
  })
  context.displayName = 'TestContext'
  return context
}

function CurrentBlockTheme () {
  return (
    <TestContext.Consumer>
      {value => {
        return (
          <span
            onClick={() => {
              value.toggle()
            }}
          >{value.name}</span>
        )
      }}
    </TestContext.Consumer>
  )
}

function TestContextBlockHeader () {
  return (
    <CurrentBlockTheme />
  )
}

function TestContextBlockBody () {
  const tool = useContext(TestContext)
  return (
    <span>current theme: {tool.name}</span>
  )
}



export default function TestContextBlock () {

  function toggleTheme (): void {
    setThemeTool(prev => {
      return {
        name: prev.name === 'dark' ? 'light' : 'dark',
        toggle: prev.toggle
      }
    })
  }

  const [themeTool, setThemeTool] = useState({
    name: 'dark',
    toggle: () => { toggleTheme() }
  })

  return (
    <TestContext.Provider value={themeTool}>
      <TestContextBlockHeader />
      <br />
      <TestContextBlockBody />
    </TestContext.Provider>
  )
}