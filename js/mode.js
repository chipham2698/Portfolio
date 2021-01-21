    function set_mode_toggle(e) {
        let t = !0, mode = "dark";
        "true" === e.getAttribute("aria-checked") && (t = !1 , mode = "light")
            e.setAttribute("aria-checked", String(t))
            change_mode(mode);
    }

    function change_mode(e) {
        const t = document.querySelector("html[data-color-mode]");
        if (e === "dark") document.cookie = "night=1;path=/";
        else document.cookie = "night=0;path=/"
        t && t.setAttribute("data-color-mode", e)
    }
   
    function get_user_scheme_mode() {
        const e = document.querySelector("html[data-color-mode]");
        if (!e)
            return;
        const t = e.getAttribute("data-color-mode");
        return "auto" === t ? function() {
            if (get_sys_scheme_mode("dark"))
                return "dark";
            if (get_sys_scheme_mode("light"))
                return "light";
        }() : t
    }
    
    function get_sys_scheme_mode(e) {
        let night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        if (night){
            if(night === '0'){
                return false
            }else if(night === '1'){
                return true
            }
        }else
        return window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${e})`).matches
    }
    !async function() {
        const e = document.querySelector(".js-promo-color-modes-toggle");
        if (e && "auto" === function() {
            const e = document.querySelector("html[data-color-mode]");
            if (!e)
                return;
            return e.getAttribute("data-color-mode")
        }()) {
            "dark" === get_user_scheme_mode() && e.setAttribute("aria-checked", "true")
        }
    }()
    !async function() {
        document.querySelector(".js-color-mode-settings") && window.history.replaceState({}, document.title, document.URL.split("?")[0])
    }()

    let toggle_btn = document.getElementsByClassName("js-promo-color-modes-toggle")
    toggle_btn[0]? toggle_btn[0].addEventListener('click',function (e) {
        set_mode_toggle(e.currentTarget)
    },false):false
