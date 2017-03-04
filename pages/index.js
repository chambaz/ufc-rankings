import React from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import data from '../data.json'

export default class extends React.Component {
  static async getInitialProps() {
    return {
      items: data
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar title="UFC Rankings" />
          <List>
            {this.props.items[0].fighters.map((item) => (
              <ListItem
                leftAvatar={<Avatar>CM</Avatar>}
                primaryText={item}
                secondaryText="11 - 1 - 1"
              />
            ))}
            <Divider inset={true} />
          </List>
        </div>
      </MuiThemeProvider>
    )
  }
}
