
#  DB設計

## usersテーブル

|Column|Type|Option|
|------|----|------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: :group_users

## messagesテーブル

|Column|Type|Option|
|------|----|------|
|body|text|        |
|image|string|     |
|group_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groupsテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users


## group_usersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

