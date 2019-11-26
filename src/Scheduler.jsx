import React from 'react'
import * as moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

export default class Scheduler extends React.Component {
  static getDerivedStateFromProps (props, state) {
    if (props.count !== state.count) {
      const year = props.year
        ? props.year
        : props.currentTime
          ? moment(props.currentTime).year()
          : moment().year()
      const week = props.week
        ? props.week
        : props.currentTime
          ? moment(props.currentTime).isoWeek()
          : moment().isoWeek()
      const showDays = props.showWeekDays
        ? props.showWeekDays.length > 0
          ? props.showWeekDays
          : [1, 2, 3, 4, 5, 6, 7]
        : [1, 2, 3, 4, 5, 6, 7]
      const startDay = showDays[0]
      const endDay = showDays[showDays.length - 1]
      const startHour = props.showDayHourStart ? props.showDayHourStart : 8
      const endHour = props.showDayHourEnd ? props.showDayHourEnd : 17
      const grid = (endHour - startHour) * Math.min(5, showDays.length) + 4
      return {
        count: props.count,
        year,
        week,
        schedulerStartTime: moment()
          .year(year)
          .isoWeek(week)
          .isoWeekday(startDay)
          .startOf('day')
          .valueOf(),
        schedulerEndTime: moment()
          .year(year)
          .isoWeek(week)
          .isoWeekday(endDay)
          .endOf('day')
          .valueOf(),
        grid
      }
    }
    return null
  }

  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      year: moment().year(),
      week: moment().isoWeek(),
      schedulerStartTime: 0,
      schedulerEndTime: 0,
      grid: 0
    }
    this.scroller = {
      body: null,
      content: null
    }
    this.siderScroller = null
    this.contentScroller = null
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeGridWidth)
    window.dispatchEvent(new Event('resize'))
  }

  componentDidUpdate (prevProps) {
    if (prevProps.count !== this.props.count) {
      this.refreshElementHeight()
      window.dispatchEvent(new Event('resize'))
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeGridWidth)
  }

  refreshElementHeight = () => {
    const siderHeader = document.getElementById('scheduler-sider-header')
    const contentHeader = document.getElementById('scheduler-content-header')
    siderHeader.style.height = 'auto'
    contentHeader.style.height = 'auto'
    const headerH = Math.max(
      siderHeader.offsetHeight || 0,
      contentHeader.offsetHeight || 0
    )
    siderHeader.style.height = headerH + 'px'
    contentHeader.style.height = headerH + 'px'
    this.props.itemList.forEach((item, index) => {
      const siderItem = document.getElementById(`scheduler-sider-item-${index}`)
      const bgItem = document.getElementById(`scheduler-content-item-${index}`)
      siderItem.style.height = 'auto'
      const itemH = siderItem.offsetHeight || 50
      bgItem.style.height = itemH + 'px'
    })
    this.scroller.body.updateScroll()
    this.scroller.content.updateScroll()
  }

  resizeGridWidth = () => {
    const content = document.getElementById('scheduler-content')
    const gridWidth = Number(
      this.state.grid === 0
        ? 30
        : (content.offsetWidth / this.state.grid).toFixed(1)
    )
    const headerHour = document.querySelectorAll(
      '.scheduler-content-header-hour-item'
    )
    headerHour.forEach(dom => {
      if (dom.classList.contains('last')) {
        dom.style.width = gridWidth - 1 + 'px'
      } else {
        dom.style.width = gridWidth + 'px'
      }
    })
    const contentHour = document.querySelectorAll(
      '.scheduler-content-body-background-hour'
    )
    contentHour.forEach(dom => {
      if (dom.classList.contains('last')) {
        dom.style.width = gridWidth - 1 + 'px'
      } else {
        dom.style.width = gridWidth + 'px'
      }
    })
    const eventItem = document.querySelectorAll(
      '.scheduler-content-body-event-item'
    )
    eventItem.forEach(dom => {
      dom.style.width =
        Number(dom.getAttribute('data-width-grid')) * gridWidth - 2 + 'px'
      dom.style.left =
        Number(dom.getAttribute('data-left-grid')) * gridWidth +
        1 +
        Math.floor(
          Number(dom.getAttribute('data-left-grid')) /
            (this.props.showDayHourEnd - this.props.showDayHourStart + 1)
        ) +
        'px'
    })
  }

  setScrollerRef = (key, ref) => {
    this.scroller[key] = ref
  }

  renderSider = () => (
    <div
      className='scheduler-sider'
      style={{
        width: this.props.layout
          ? this.props.layout.siderWidth
            ? this.props.layout.siderWidth
            : '200px'
          : '200px'
      }}
    >
      <div id='scheduler-sider-header' className='scheduler-sider-header'>
        <div>
          {this.props.layout
            ? this.props.layout.siderTitle
              ? this.props.layout.siderTitle
              : ''
            : ''}
        </div>
      </div>
      <div className='scheduler-sider-body'>
        <PerfectScrollbar
          options={{
            suppressScrollX: true
          }}
          containerRef={this.setSiderScroller}
          onScrollY={this.handleSiderScroller}
        >
          <div className='scheduler-sider-list'>{this.renderSiderList()}</div>
        </PerfectScrollbar>
      </div>
    </div>
  )

  handleSiderScroller = () => {
    this.siderScroller.scrollTop = this.contentScroller.scrollTop
  }

  setSiderScroller = ref => {
    this.siderScroller = ref
  }

  renderSiderList = () => {
    const itemList = this.props.itemList ? this.props.itemList : []
    return itemList.map((item, index) => {
      return (
        <div
          id={`scheduler-sider-item-${index}`}
          className='scheduler-sider-item'
          key={`sider-item-${index}`}
          data-sider-item-key={`sider-item-${index}`}
          style={{
            minHeight: this.props.layout
              ? this.props.layout.itemHeight
                ? this.props.layout.itemHeight + 'px'
                : '50px'
              : '50px'
          }}
        >
          {item.siderDisplay}
        </div>
      )
    })
  }

  renderContent = () => (
    <div
      id='scheduler-content'
      className='scheduler-content'
      style={{
        width: this.props.layout
          ? this.props.layout.siderWidth
            ? 'calc(100% - ' + this.props.layout.siderWidth + 'px)'
            : 'calc(100% - 200px)'
          : 'calc(100% - 200px)'
      }}
    >
      <PerfectScrollbar
        ref={this.setScrollerRef.bind(this, 'body')}
      >
        {this.renderContentHeader()}
        {this.renderContentBody()}
      </PerfectScrollbar>
    </div>
  )

  renderContentHeader = () => {
    const year = this.state.year
    const week = this.state.week
    const showDays = this.props.showWeekDays
      ? this.props.showWeekDays.length > 0
        ? this.props.showWeekDays
        : [1, 2, 3, 4, 5, 6, 7]
      : [1, 2, 3, 4, 5, 6, 7]
    return (
      <div id='scheduler-content-header' className='scheduler-content-header'>
        {showDays.map(day => {
          const thisDay = moment()
            .year(year)
            .isoWeek(week)
            .isoWeekday(day)
          const pastClass =
            thisDay.endOf('day').valueOf() < moment().valueOf() ? ' past' : ''
          return (
            <div
              className='scheduler-content-header-day'
              key={thisDay.startOf('day').valueOf()}
            >
              <div className={`scheduler-content-header-day-title${pastClass}`}>
                {thisDay.startOf('day').format('DD/MM(ddd)')}
              </div>
              <div className='scheduler-content-header-hour'>
                {this.renderContentHeaderHours(
                  thisDay.startOf('day').valueOf()
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderContentHeaderHours = timestamp => {
    const startHour = this.props.showDayHourStart
      ? this.props.showDayHourStart
      : 8
    const endHour = this.props.showDayHourEnd ? this.props.showDayHourEnd : 17
    const hours = []
    for (let i = startHour; i < endHour; i++) {
      hours.push(i)
    }
    return hours.map((hour, index) => {
      const thisDay = moment(timestamp).startOf('day')
      const thisHour = thisDay.hour(hour).endOf('hour')
      const lastClass = index + 1 === hours.length ? ' last' : ''
      const pastClass = thisHour.valueOf() < moment().valueOf() ? ' past' : ''
      return (
        <div
          className={`scheduler-content-header-hour-item${lastClass}${pastClass}`}
          key={moment(timestamp)
            .add(hour, 'hours')
            .valueOf()}
        >
          <span>
            {moment(timestamp)
              .add(hour, 'hours')
              .format('HH')}
          </span>
        </div>
      )
    })
  }

  setContentScroller = ref => {
    this.contentScroller = ref
  }

  handleContentScroller = () => {
    this.siderScroller.scrollTop = this.contentScroller.scrollTop
  }

  renderContentBody = () => (
    <div className='scheduler-content-body'>
      <PerfectScrollbar
        options={{
          suppressScrollX: true
        }}
        containerRef={this.setContentScroller}
        ref={this.setScrollerRef.bind(this, 'content')}
        onScrollY={this.handleContentScroller}
      >
        {this.renderContentBodyItem()}
      </PerfectScrollbar>
    </div>
  )

  renderContentBodyItem = () => {
    const itemList = this.props.itemList ? this.props.itemList : []
    return itemList.length > 0 ? (
      <div className='scheduler-content-body-list'>
        {itemList.map((item, index) => {
          return (
            <div
              id={`scheduler-content-item-${index}`}
              key={index}
              className='scheduler-content-body-item'
            >
              {this.renderContentBodyBackground()}
              {this.renderContentBodyEvents(index)}
            </div>
          )
        })}
      </div>
    ) : (
      <div />
    )
  }

  renderContentBodyBackground = () => {
    const showDays = this.props.showWeekDays
      ? this.props.showWeekDays.length > 0
        ? this.props.showWeekDays
        : [1, 2, 3, 4, 5, 6, 7]
      : [1, 2, 3, 4, 5, 6, 7]
    const startHour = this.props.showDayHourStart
      ? this.props.showDayHourStart
      : 8
    const endHour = this.props.showDayHourEnd ? this.props.showDayHourEnd : 17
    return (
      <div className='scheduler-content-body-background-item'>
        {showDays.map((day, dayIndex) => {
          const thisDay = moment()
            .year(this.state.year)
            .isoWeek(this.state.week)
            .isoWeekday(day)
            .startOf('day')
          const hours = []
          for (let i = startHour; i < endHour; i++) {
            hours.push(i)
          }
          return (
            <div
              key={thisDay.valueOf()}
              className='scheduler-content-body-background-day'
            >
              {hours.map((hour, hourIndex) => {
                const thisHour = thisDay.hour(hour).endOf('hour')
                const lastClass = hourIndex + 1 === hours.length ? ' last' : ''
                const pastClass =
                  thisHour.valueOf() < moment().valueOf() ? ' past' : ''
                return (
                  <div
                    className={`scheduler-content-body-background-hour${lastClass}${pastClass}`}
                    key={thisHour.valueOf()}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  renderContentBodyEvents = index => {
    const showDays = this.props.showWeekDays
      ? this.props.showWeekDays.length > 0
        ? this.props.showWeekDays
        : [1, 2, 3, 4, 5, 6, 7]
      : [1, 2, 3, 4, 5, 6, 7]
    const startHour = this.props.showDayHourStart
      ? this.props.showDayHourStart
      : 8
    const endHour = this.props.showDayHourEnd ? this.props.showDayHourEnd : 17
    const eventList = this.props.itemList[index]
      ? this.props.itemList[index].eventList
        ? this.props.itemList[index].eventList
        : []
      : []
    const displayEvents = eventList.filter(event => {
      return (
        (event.startTime >= this.state.schedulerStartTime &&
          event.startTime <= this.state.schedulerEndTime) ||
        (event.endTime >= this.state.schedulerStartTime &&
          event.endTime <= this.state.schedulerEndTime)
      )
    })
    return displayEvents.length > 0 ? (
      <div className='scheduler-content-body-event'>
        {eventList.map((event, index) => {
          let units = 0
          let lefts = 0
          const eventStartDay =
            event.startTime < this.state.schedulerStartTime
              ? 1
              : moment(event.startTime).isoWeekday() === 0
                ? 7
                : moment(event.startTime).isoWeekday()
          const eventEndDay =
            event.endTime > this.state.schedulerEndTime
              ? 7
              : moment(event.endTime).isoWeekday() === 0
                ? 7
                : moment(event.endTime).isoWeekday()
          const eventStartHour =
            moment(event.startTime).hour() +
            moment(event.startTime).minute() / 60
          const eventEndHour =
            moment(event.endTime).hour() + moment(event.endTime).minute() / 60
          if (eventStartDay === eventEndDay) {
            if (showDays.includes(eventStartDay)) {
              units = Math.max(
                0,
                Math.min(eventEndHour, endHour) -
                  Math.max(eventStartHour, startHour)
              )
            }
          } else {
            for (let i = eventStartDay; i <= eventEndDay + 1; i++) {
              if (showDays.includes(i)) {
                if (i === eventStartDay) {
                  units += Math.max(
                    0,
                    endHour - Math.max(eventStartHour, startHour)
                  )
                } else if (i === eventEndDay) {
                  units += Math.max(
                    0,
                    Math.min(eventEndHour, endHour) - startHour
                  )
                } else {
                  units += Math.max(
                    0,
                    Math.min(eventEndHour, endHour) -
                      Math.max(eventStartHour, startHour)
                  )
                }
              }
            }
          }
          if (units > 0) {
            const eventStartIndex = showDays.findIndex(
              day => day === eventStartDay
            )
            if (eventStartIndex > -1) {
              lefts =
                Math.max(0, eventStartIndex) * (endHour - startHour) +
                Math.max(
                  0,
                  Math.min(eventStartHour - startHour, endHour - startHour)
                )
            }
          }
          return units > 0 ? (
            <div
              key={index}
              data-width-grid={units}
              data-left-grid={lefts}
              className={`scheduler-content-body-event-item ${event.className ||
                ''}`}
            >
              {event.title}
            </div>
          ) : null
        })}
      </div>
    ) : null
  }

  renderLayout = () => (
    <div className='scheduler-layout'>
      {this.renderSider()}
      {this.renderContent()}
    </div>
  )

  render () {
    const keys = Object.keys(this.props)
    return keys.length === 0 ? null : (
      <div id='scheduler' className='scheduler'>
        {this.renderLayout()}
      </div>
    )
  }
}
