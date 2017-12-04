    $(document).ready(function(){
      $('.parallax').parallax();
    });  //Parallax


    $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });  //Modal


    setTimeout(function (){
      $('.button-collapse').sideNav('show');
    },1000)
