import React from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import data from '../data.json'
import injectTapEventPlugin from 'react-tap-event-plugin'
import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weightClass: 'Pound-for-Pound',
      open: false
    }

    this.openDrawer = () => this.setState({open: true})
    this.closeDrawer = () => this.setState({open: false})
    this.changeWeightClass = weightClass => {
      this.setState({weightClass: weightClass})
      this.closeDrawer()
    }
  }

  static async getInitialProps() {
    return {
      items: data
    }
  }

  componentWillMount() {
    if (typeof window !== 'undefined') injectTapEventPlugin()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title='UFC Rankings'
            onLeftIconButtonTouchTap={this.openDrawer}
          />
          <List>
            <Subheader>{this.state.weightClass}</Subheader>
            {_.find(this.props.items, item => {
              return item.weightClass === this.state.weightClass
            }).fighters.map((item, index) => (
              <ListItem
                leftAvatar={<Avatar>CM</Avatar>}
                primaryText={item}
                secondaryText="11 - 1 - 1"
                key={index}
              />
            ))}
            <Divider inset={true} />
          </List>
          <Drawer open={this.state.open}>
            {this.props.items.map((item) => (
              <MenuItem onTouchTap={() => this.changeWeightClass(item.weightClass)}>{item.weightClass}</MenuItem>
            ))}
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
