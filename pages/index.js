import React from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

const items = [
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  },
  {
    name: 'Connor Mcgregor',
    record: '11 - 1 - 1'
  }
]

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div>
      <AppBar title="UFC Rankings" />
      <List>
        {items.map((item) => (
          <ListItem
            leftAvatar={<Avatar>CM</Avatar>}
            primaryText={item.name}
            secondaryText={item.record}
          />
        ))}
        <Divider inset={true} />
      </List>
    </div>
  </MuiThemeProvider>
)

export default App
