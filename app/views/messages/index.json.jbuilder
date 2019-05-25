json.array! @new_messages.each do |message|
  json.id message.id
  json.body message.body
  json.user_name message.user.name
  json.image message.image
  json.data message.created_at.strftime("%Y/%m/%d %H:%M")
end
