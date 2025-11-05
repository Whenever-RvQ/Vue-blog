export default {
  home:()=>[ {
    icon: "el-icon-edit",
    route: "/editor"
  },
],
  index: () => [
    {
      icon: "el-icon-edit",
      route: "/editor"
    },
    {
      icon:"el-icon-star-on",
      route:"/like"
    }
  ],
  article: () => [
    {
      icon: "el-icon-edit",
      route: "/editor"
    },
    {
      icon: "el-icon-star-on",
    },
    {
      icon: "el-icon-download",
    }
  ]
}