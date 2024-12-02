
import { formatDuration } from '../../utils/FormatDuration';
import AddToCalendar from './AddToCalendarBtn'
import EditBtn from './EditBtn'
import SignUp from './SignUpBtn'

function EventPageSignupControls({eventData, session}) {
    const {id,  author, start_datetime, end_datetime} = eventData
    const duration = formatDuration(start_datetime, end_datetime);

  return (
    <div className="flex self-start gap-2">
              <SignUp id={id} duration={duration} />
              <AddToCalendar event={eventData} />
              {session.user.email.split("@")[0] == author && <EditBtn />}
            </div>
  )
}

export default EventPageSignupControls