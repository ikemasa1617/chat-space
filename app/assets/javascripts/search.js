$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#member-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix" id="chat-group-user-${user.id}">
                  <p class="chat-group-user__name">
                  ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                  追加
                  </div>
                </div>`;
      search_list.append(html);
  }

  function appendNoUser(msg){
    var html = `<div class='chat-group-user clearfix'>${ msg }</div>`
    search_list.append(html);
  }
  
  function appendMembers(user_name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}' class="chat-group-user__selected_user_id">
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-member-id="${user_id}" data-member-name="${user_name}">
                  削除
                  </div>
                </div>`;
      member_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var group_id = $("#user-search-field").attr('data-id')
    var selected_users = [];
    selected_users.length = 0;

    $('.chat-group-user__selected_user_id').each(function(){
      selected_users.push($(this).attr("value"));
    });
    

    if (input.length !== 0){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input, selected_users: selected_users, group_id: group_id},
        dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        })
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert('検索に失敗しました');
    });
  }else{
    $("#user-search-result").empty();
   }
  });


  $(function(){
    $("#user-search-result").on("click", '.user-search-add', function(){
      $('#chat-group-users').val();
      var user_name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      appendMembers(user_name, user_id);
    });

    $(function(){
      $("#member-search-result").on("click", '.chat-group-user__btn--remove', function(){
        $(this).parent().remove();
      });
    });
  });
});