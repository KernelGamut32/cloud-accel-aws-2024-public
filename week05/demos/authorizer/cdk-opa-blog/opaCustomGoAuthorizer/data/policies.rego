package opablog
default allow=false
allow=true {
    input.Usergroup == data.GroupPermissions[input.Resource][_]
}