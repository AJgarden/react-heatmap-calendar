import React from 'react'
import moment from 'moment'
import Scheduler from './Scheduler'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
    this.schedulerData = {
      year: moment().year(),
      week: moment().isoWeek(),
      itemList: [
        {
          key: '1',
          siderDisplay: <>Example Resource 1</>,
          eventList: [
            {
              key: '1-1',
              startTime: moment()
                .isoWeekday(2)
                .hour(8)
                .minute(30)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(12)
                .minute(0)
                .valueOf(),
              title: (
                <>
                  Event 1-1
                  <br />
                  8:30 - 12:00
                </>
              )
            },
            {
              key: '1-2',
              startTime: moment()
                .isoWeekday(4)
                .hour(15)
                .minute(30)
                .valueOf(),
              endTime: moment()
                .isoWeekday(4)
                .hour(20)
                .minute(30)
                .valueOf(),
              title: 'Event 1-2 15:30 - 20:30'
            }
          ]
        },
        {
          key: '2',
          siderDisplay: <>Resource 2</>,
          eventList: [
            {
              key: '2-1',
              startTime: moment()
                .isoWeekday(1)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(9)
                .minute(0)
                .valueOf(),
              title: (
                <>
                  Event 2-1
                  <br />
                  Mon 9:00 - Tue 9:00
                </>
              )
            },
            {
              key: '2-2',
              startTime: moment()
                .isoWeekday(3)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(16)
                .minute(45)
                .valueOf(),
              title: 'Event 2-2 12:00 - 16:45'
            }
          ]
        }
      ],
      layout: {
        gridWidth: 30,
        itemHeight: 60,
        siderTitle: 'Resources',
        siderWidth: 150
      },
      showDayHourStart: 8,
      showDayHourEnd: 18,
      showWeekDays: [1, 2, 3, 4, 5, 6, 7]
    }
    this.schedulerData2 = {
      year: moment().year(),
      week: moment().isoWeek(),
      itemList: [
        {
          key: '1',
          siderDisplay: <>Example Resource 1</>,
          eventList: [
            {
              key: '1-1',
              startTime: moment()
                .isoWeekday(2)
                .hour(8)
                .minute(30)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(12)
                .minute(0)
                .valueOf(),
              title: (
                <>
                  Event 1-1
                  <br />
                  8:30 - 12:00
                </>
              )
            },
            {
              key: '1-2',
              startTime: moment()
                .isoWeekday(4)
                .hour(15)
                .minute(30)
                .valueOf(),
              endTime: moment()
                .isoWeekday(4)
                .hour(20)
                .minute(30)
                .valueOf(),
              title: 'Event 1-2 15:30 - 20:30'
            }
          ]
        },
        {
          key: '2',
          siderDisplay: <>Resource 2</>,
          eventList: [
            {
              key: '2-1',
              startTime: moment()
                .isoWeekday(1)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(9)
                .minute(0)
                .valueOf(),
              title: (
                <>
                  Event 2-1
                  <br />
                  Mon 9:00 - Tue 9:00
                </>
              )
            },
            {
              key: '2-2',
              startTime: moment()
                .isoWeekday(3)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(16)
                .minute(45)
                .valueOf(),
              title: 'Event 2-2 12:00 - 16:45'
            }
          ]
        },
        {
          key: '3',
          siderDisplay: <>Resource 3</>,
          eventList: [
            {
              key: '3-1',
              startTime: moment()
                .isoWeekday(3)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(15)
                .minute(30)
                .valueOf(),
              title: <>Event 3-1</>
            },
            {
              key: '3-2',
              startTime: moment()
                .isoWeekday(5)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(16)
                .minute(45)
                .valueOf(),
              title: 'Event 3-2'
            }
          ]
        },
        {
          key: '4',
          siderDisplay: <>Resource 4</>,
          eventList: [
            {
              key: '4-1',
              startTime: moment()
                .isoWeekday(1)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(1)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 4-1'
            },
            {
              key: '4-2',
              startTime: moment()
                .isoWeekday(2)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 4-2'
            },
            {
              key: '4-3',
              startTime: moment()
                .isoWeekday(3)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 4-3'
            },
            {
              key: '4-4',
              startTime: moment()
                .isoWeekday(4)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(4)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 4-4'
            },
            {
              key: '4-5',
              startTime: moment()
                .isoWeekday(5)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(5)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 4-5'
            }
          ]
        },
        {
          key: '5',
          siderDisplay: <>Example Resource 1</>,
          eventList: [
            {
              key: '5-1',
              startTime: moment()
                .isoWeekday(2)
                .hour(8)
                .minute(30)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(12)
                .minute(0)
                .valueOf(),
              title: (
                <>
                  Event 5-1
                  <br />
                  8:30 - 12:00
                </>
              )
            },
            {
              key: '5-2',
              startTime: moment()
                .isoWeekday(4)
                .hour(15)
                .minute(30)
                .valueOf(),
              endTime: moment()
                .isoWeekday(4)
                .hour(20)
                .minute(30)
                .valueOf(),
              title: 'Event 5-2 15:30 - 20:30'
            }
          ]
        },
        {
          key: '6',
          siderDisplay: <>Resource 2</>,
          eventList: [
            {
              key: '6-1',
              startTime: moment()
                .isoWeekday(1)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(9)
                .minute(0)
                .valueOf(),
              title: (
                <>
                  Event 6-1
                  <br />
                  Mon 9:00 - Tue 9:00
                </>
              )
            },
            {
              key: '6-2',
              startTime: moment()
                .isoWeekday(3)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(16)
                .minute(45)
                .valueOf(),
              title: 'Event 6-2 12:00 - 16:45'
            }
          ]
        },
        {
          key: '7',
          siderDisplay: <>Resource 3</>,
          eventList: [
            {
              key: '7-1',
              startTime: moment()
                .isoWeekday(3)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(15)
                .minute(30)
                .valueOf(),
              title: <>Event 7-1</>
            },
            {
              key: '7-2',
              startTime: moment()
                .isoWeekday(5)
                .hour(12)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(16)
                .minute(45)
                .valueOf(),
              title: 'Event 7-2'
            }
          ]
        },
        {
          key: '8',
          siderDisplay: <>Resource 4</>,
          eventList: [
            {
              key: '8-1',
              startTime: moment()
                .isoWeekday(1)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(1)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 8-1'
            },
            {
              key: '8-2',
              startTime: moment()
                .isoWeekday(2)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(2)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 8-2'
            },
            {
              key: '8-3',
              startTime: moment()
                .isoWeekday(3)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(3)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 8-3'
            },
            {
              key: '8-4',
              startTime: moment()
                .isoWeekday(4)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(4)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 8-4'
            },
            {
              key: '8-5',
              startTime: moment()
                .isoWeekday(5)
                .hour(9)
                .minute(0)
                .valueOf(),
              endTime: moment()
                .isoWeekday(5)
                .hour(10)
                .minute(0)
                .valueOf(),
              title: 'Event 8-5'
            }
          ]
        }
      ],
      layout: {
        gridWidth: 30,
        itemHeight: 60,
        siderTitle: 'Resources',
        siderWidth: 150
      },
      showDayHourStart: 8,
      showDayHourEnd: 18,
      showWeekDays: [1, 2, 3, 4, 5, 6, 7]
    }
  }

  componentDidMount () {
    this.setState({
      count: 1
    })
  }

  renderScheduler = () => {
    return this.state.count % 2 > 0 ? (
      <Scheduler {...this.schedulerData} count={this.state.count} />
    ) : (
      <Scheduler {...this.schedulerData2} count={this.state.count} />
    )
  }

  switchData = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    return (
      <div style={{ padding: '40px' }}>
        <button onClick={this.switchData}>Switch Data</button>
        <br />
        <br />
        {this.renderScheduler()}
      </div>
    )
  }
}
