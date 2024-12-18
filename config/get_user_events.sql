BEGIN
  RETURN QUERY
  SELECT 
    e.id ,
    e.title,
    e.description,
    e.start_datetime,
    e.end_datetime,
    e.location,
    e.img_url,
    e.body
  FROM user_events ue
  JOIN events e ON ue.event_id = e.id
  WHERE ue.id = user_id;
END;
