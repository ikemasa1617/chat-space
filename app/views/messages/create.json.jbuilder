json.user_name @message.user.name
json.body @message.body
json.image @message.image.url
json.data @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id
