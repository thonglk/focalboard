// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('copyScript', (done) => {
    console.log('copyScript');
    gulp.src(['pack/index.html']).
        pipe(replace('></head>',
            `>
            <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="b1fd7049-886a-475f-90a4-a212e6cc2271";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
            <!-- Hotjar Tracking Code for https://hyper.liti.me -->
            <script>
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:2475019,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            </script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-160609552-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-160609552-4');
  gtag('event', 'page_view', {
  page_location: window.location.href,
  page_path: '/example',
  page_title: 'example'
});
</script>

</head>
`)).pipe(gulp.dest('pack/'));
    done();
});

