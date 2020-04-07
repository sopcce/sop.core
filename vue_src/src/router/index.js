import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // 可以在根导航中设置角色
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // 或者只能在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission',
          icon: 'size'
          // 如果不设置角色，意味着:此页面不需要权限
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      // table
      {
        path: '/table',
        component: Layout,
        redirect: '/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          {
            path: 'dynamic-table',
            component: () => import('@/views/table/dynamic-table/index'),
            name: 'DynamicTable',
            meta: { title: 'dynamicTable' }
          },
          {
            path: 'drag-table',
            component: () => import('@/views/table/drag-table'),
            name: 'DragTable',
            meta: { title: 'dragTable' }
          },
          {
            path: 'inline-edit-table',
            component: () => import('@/views/table/inline-edit-table'),
            name: 'InlineEditTable',
            meta: { title: 'inlineEditTable' }
          },
          {
            path: 'complex-table',
            component: () => import('@/views/table/complex-table'),
            name: 'ComplexTable',
            meta: { title: 'complexTable' }
          }
        ]
      },
      // error
      {
        path: '/error',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
          title: 'errorPages',
          icon: '404'
        },
        children: [
          {
            path: '/error/401',
            component: () => import('@/views/error-page/401'),
            name: 'Page401',
            meta: { title: 'page401', noCache: true }
          },
          {
            path: '/error/404',
            component: () => import('@/views/error-page/404'),
            name: 'Page404',
            meta: { title: 'page404', noCache: true }
          }
        ]
      },
      // excel
      {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
          title: 'excel',
          icon: 'excel'
        },
        children: [
          {
            path: 'export-excel',
            component: () => import('@/views/excel/export-excel'),
            name: 'ExportExcel',
            meta: { title: 'exportExcel' }
          },
          {
            path: 'export-selected-excel',
            component: () => import('@/views/excel/select-excel'),
            name: 'SelectExcel',
            meta: { title: 'selectExcel' }
          },
          {
            path: 'export-merge-header',
            component: () => import('@/views/excel/merge-header'),
            name: 'MergeHeader',
            meta: { title: 'mergeHeader' }
          },
          {
            path: 'upload-excel',
            component: () => import('@/views/excel/upload-excel'),
            name: 'UploadExcel',
            meta: { title: 'uploadExcel' }
          }
        ]
      },
      // charts
      {
        path: '/charts',
        component: Layout,
        redirect: 'noRedirect',
        name: 'Charts',
        meta: {
          title: 'charts',
          icon: 'chart'
        },
        children: [
          {
            path: 'keyboard',
            component: () => import('@/views/charts/keyboard'),
            name: 'KeyboardChart',
            meta: { title: 'keyboardChart', noCache: true }
          },
          {
            path: 'line',
            component: () => import('@/views/charts/line'),
            name: 'LineChart',
            meta: { title: 'lineChart', noCache: true }
          },
          {
            path: 'mix-chart',
            component: () => import('@/views/charts/mix-chart'),
            name: 'MixChart',
            meta: { title: 'mixChart', noCache: true }
          }
        ]
      },
      // components
      {
        path: '/components',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ComponentDemo',
        meta: {
          title: 'components',
          icon: 'component'
        },
        children: [
          {
            path: 'tinymce',
            component: () => import('@/views/components-demo/tinymce'),
            name: 'TinymceDemo',
            meta: { title: 'tinymce' }
          },
          {
            path: 'markdown',
            component: () => import('@/views/components-demo/markdown'),
            name: 'MarkdownDemo',
            meta: { title: 'markdown' }
          },
          {
            path: 'json-editor',
            component: () => import('@/views/components-demo/json-editor'),
            name: 'JsonEditorDemo',
            meta: { title: 'jsonEditor' }
          },
          {
            path: 'split-pane',
            component: () => import('@/views/components-demo/split-pane'),
            name: 'SplitpaneDemo',
            meta: { title: 'splitPane' }
          },
          {
            path: 'avatar-upload',
            component: () => import('@/views/components-demo/avatar-upload'),
            name: 'AvatarUploadDemo',
            meta: { title: 'avatarUpload' }
          },
          {
            path: 'dropzone',
            component: () => import('@/views/components-demo/dropzone'),
            name: 'DropzoneDemo',
            meta: { title: 'dropzone' }
          },
          {
            path: 'sticky',
            component: () => import('@/views/components-demo/sticky'),
            name: 'StickyDemo',
            meta: { title: 'sticky' }
          },
          {
            path: 'count-to',
            component: () => import('@/views/components-demo/count-to'),
            name: 'CountToDemo',
            meta: { title: 'countTo' }
          },
          {
            path: 'mixin',
            component: () => import('@/views/components-demo/mixin'),
            name: 'ComponentMixinDemo',
            meta: { title: 'componentMixin' }
          },
          {
            path: 'back-to-top',
            component: () => import('@/views/components-demo/back-to-top'),
            name: 'BackToTopDemo',
            meta: { title: 'backToTop' }
          },
          {
            path: 'drag-dialog',
            component: () => import('@/views/components-demo/drag-dialog'),
            name: 'DragDialogDemo',
            meta: { title: 'dragDialog' }
          },
          {
            path: 'drag-select',
            component: () => import('@/views/components-demo/drag-select'),
            name: 'DragSelectDemo',
            meta: { title: 'dragSelect' }
          },
          {
            path: 'dnd-list',
            component: () => import('@/views/components-demo/dnd-list'),
            name: 'DndListDemo',
            meta: { title: 'dndList' }
          },
          {
            path: 'drag-kanban',
            component: () => import('@/views/components-demo/drag-kanban'),
            name: 'DragKanbanDemo',
            meta: { title: 'dragKanban' }
          }
        ]
      },

      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      },
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: {
          title: 'editArticle',
          noCache: true,
          activeMenu: '/example/list'
        },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      },
      {
        path: '/tab/index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      },

      {
        path: '/error-log',
        component: Layout,
        children: [
          {
            path: 'log',
            component: () => import('@/views/error-log/index'),
            name: 'ErrorLog',
            meta: { title: 'errorLog', icon: 'bug' }
          }
        ]
      },
      // zip
      {
        path: '/zip',
        component: Layout,
        redirect: '/zip/download',
        alwaysShow: true,
        name: 'Zip',
        meta: { title: 'zip', icon: 'zip' },
        children: [
          {
            path: 'download',
            component: () => import('@/views/zip/index'),
            name: 'ExportZip',
            meta: { title: 'exportZip' }
          }
        ]
      },

      {
        path: '/pdf',
        component: Layout,
        redirect: '/pdf/index',
        children: [
          {
            path: 'index',
            component: () => import('@/views/pdf/index'),
            name: 'PDF',
            meta: { title: 'pdf', icon: 'pdf' }
          }
        ]
      },
      {
        path: '/pdf/download',
        component: () => import('@/views/pdf/download'),
        hidden: true
      },

      {
        path: '/theme',
        component: Layout,
        children: [
          {
            path: 'index',
            component: () => import('@/views/theme/index'),
            name: 'Theme',
            meta: { title: 'theme', icon: 'theme' }
          }
        ]
      },

      {
        path: '/clipboard',
        component: Layout,
        children: [
          {
            path: 'index',
            component: () => import('@/views/clipboard/index'),
            name: 'ClipboardDemo',
            meta: { title: 'clipboardDemo', icon: 'clipboard' }
          }
        ]
      },

      {
        path: '/i18n',
        component: Layout,
        children: [
          {
            path: 'index',
            component: () => import('@/views/i18n-demo/index'),
            name: 'I18n',
            meta: { title: 'i18n', icon: 'international' }
          }
        ]
      },

      {
        path: 'external-link',
        component: Layout,
        children: [
          {
            path: 'https://github.com/PanJiaChen/vue-element-admin',
            meta: { title: 'externalLink', icon: 'link' }
          }
        ]
      }
    ]
  },
  /** 当你的路由图太长时，你可以把它分成小模块 **/
  nestedRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
