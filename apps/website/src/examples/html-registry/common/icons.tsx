import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  ArrowRight,
  FileText,
  FolderKanban,
  LayoutPanelLeft,
  Menu,
  Search,
  Send,
  Sparkles,
} from 'lucide-react'

function renderIconSvg(icon: ReactNode) {
  return renderToStaticMarkup(icon)
}

export const htmlExampleIcons = {
  search: renderIconSvg(<Search className="size-4" />),
  fileText: renderIconSvg(<FileText className="size-4" />),
  send: renderIconSvg(<Send className="size-4" />),
  sparkles: renderIconSvg(<Sparkles className="size-4" />),
  folderKanban: renderIconSvg(<FolderKanban className="size-4" />),
  layoutPanelLeft: renderIconSvg(<LayoutPanelLeft className="size-4" />),
  menu: renderIconSvg(<Menu className="size-4" />),
  arrowRight: renderIconSvg(<ArrowRight className="size-4" />),
}
