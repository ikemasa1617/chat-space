$(function(){
  function buildHTML(message){
    var addImage = (message.image) ? `<img class="message-content__image" src="${ message.image }">` : '';
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="message-info">
                    <div class="message-info__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="message-info__data">
                      ${ message.data }
                    </div>
                  </div>
                  <div class="message-content">
                    <p class="message-content__text">
                        ${ message.body }<br/>
                        ${ addImage }
                    </p>
                  </div>
                </div>`;
        return html;    
  }
  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = new FormData(this);
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });

   var reloadMessages = function() {
    if(location.href.match(/\/groups\/\d+\/messages/)){
       if($('.message')[0]){
         var last_message_id = $('.message:last').data('message-id');
       }else{
         var last_message_id = 0;
       }
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
        insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
     })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
   };
  }
   setInterval(reloadMessages, 5000);
});
