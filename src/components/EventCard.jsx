function EventCard({ event }) {
  const { title, description, datetime, img_url, author } = event;
  const [date,time] = datetime.split('T')
  return (
    <div className="rounded-lg flex flex-col justify-center items-center">
      <h2>{title}</h2>
      <img className='w-32 h-24 object-contain' src={img_url} alt="" />
      <p>{description}</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{author}</p>
    </div>
  );
}

export default EventCard;
