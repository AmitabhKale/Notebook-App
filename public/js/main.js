$(document).ready(function(){
  $('.delete-notes').on('click', function(){
    var id = $(this).data('id');
    var url = '/delete/'+id;
    if(confirm('Delete Notes?')){
      $.ajax({
        url:url,
        type: 'DELETE',
        success: function(result){
          console.log('Deleting Notes...');
          window.location.href-'/';
        },
          error: function(err){
              console.log(err);
          }
      })
    }
  })

  $('.edit-notes').on('click', function(){
    $('#edit-form-name').val($(this).data('name'));
    $('#edit-form-desciptions').val($(this).data('desciptions'));
    $('#edit-form-directions').val($(this).data('directions'));
    $('#edit-form-id').val($(this).data('id'));
  })
})
