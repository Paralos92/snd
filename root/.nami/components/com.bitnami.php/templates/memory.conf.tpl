;
; Bitnami PHP-FPM Configuration
;
; IMPORTANT: This file will be overwritten to adapt the memory settings for the server memory.
; If you want to add any configuration, please add it to the {{$app.confFile}} file
;
pm.max_children={{max_children}}
pm.start_servers={{start_servers}}
pm.min_spare_servers={{min_spare_servers}}
pm.max_spare_servers={{max_spare_servers}}
pm.max_requests=5000
