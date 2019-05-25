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
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
    })
  })
});
