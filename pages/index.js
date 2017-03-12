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
            title={this.state.weightClass}
            onLeftIconButtonTouchTap={this.openDrawer}
          />
          <List style={{padding: 0}}>
            {_.find(this.props.items, item => {
              return item.weightClass === this.state.weightClass
            }).fighters.map((item, index) => {
              let name = item.name
              let record = item.record
              let style = {}
              let avatarSize = 40

              if (index === 0) {
                name = <div style={{paddingLeft: 20}}>{name} 🏆</div>
                record = <div style={{paddingLeft: 20}}>{record}</div>
                style.backgroundColor = getMuiTheme(lightBaseTheme).palette.accent2Color
                style.padding = '20px 0 30px'
                avatarSize = 60
              }

              return (
                <div>
                  <ListItem
                    leftAvatar={(
                      <Avatar backgroundColor='#fff' size={avatarSize} style={{overflow: 'hidden'}}>
                        <div style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          width: avatarSize,
                          height: avatarSize
                        }}></div>
                      </Avatar>
                    )}
                    primaryText={name}
                    secondaryText={record}
                    key={index}
                    style={style}
                  />
                  <Divider />
                </div>
              )
            })}
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
