/*
 * Shared site menu for the Digital Exhibition documentation.
 *
 * Every page loads this file with <script src="nav.js" defer></script>. It adds the
 * menu to the page's sticky <header>: inline on large screens, as a scrollable row
 * under the header on small ones. To add a page, add it to PAGES below — nothing
 * else needs to change.
 */
(function () {
  // documentation.html is deliberately left out: it still exists but is no longer browsable from the menu.
  const PAGES = [
    { href: 'index.html',         label: 'Migration plan' },
    { href: 'jam-stack.html',     label: 'WP → Jamstack' },
    { href: 'recap.html',         label: 'Recap' },
  ];

  const header = document.querySelector('header');
  const bar = header && header.firstElementChild;
  if (!bar) return;

  // The brand (logo, name, page name) is the same on every page and links to the home page.
  // Each page only supplies its own page name, as the .text-mute span in its header.
  const pageName = (bar.children[0].querySelector('.text-mute') || {}).innerHTML || '';
  const brand = document.createElement('a');
  brand.href = 'index.html';
  brand.title = 'Digital Exhibition — documentation home';
  brand.className = 'flex items-center gap-3 transition hover:opacity-80';
  brand.innerHTML = `<img src="assets/tue-black.svg" alt="TU/e — Eindhoven University of Technology" class="h-5 w-auto">
    <span class="flex flex-col leading-tight">
      <span class="text-sm font-semibold tracking-tight">TU/e Digital Exhibition</span>
      <span class="text-xs text-mute">${pageName}</span>
    </span>`;
  bar.children[0].replaceWith(brand);

  // "/project/" or "/" is the index page.
  const current = location.pathname.split('/').pop() || 'index.html';

  const link = (p, extra) => {
    const on = p.href === current;
    return `<a href="${p.href}"${on ? ' aria-current="page"' : ''}
      class="${extra} whitespace-nowrap transition ${on
        ? 'font-semibold text-ink'
        : 'text-mute hover:text-ink'}">${p.label}</a>`;
  };

  // Large screens: between the title and the right-hand buttons.
  const inline = document.createElement('nav');
  inline.setAttribute('aria-label', 'Documentation pages');
  inline.className = 'hidden items-center gap-1 lg:flex';
  inline.innerHTML = PAGES.map(p => link(p,
    `rounded-md px-2.5 py-1.5 text-[13px] ${p.href === current ? 'bg-panel ring-1 ring-inset ring-line' : 'hover:bg-panel'}`)).join('');
  bar.children[0].after(inline);

  // The page title is redundant next to a highlighted menu item once there is room for both.
  const sub = bar.querySelector('.text-mute');
  if (sub && bar.children[0].contains(sub)) sub.classList.add('hidden', '2xl:inline');

  // Small screens: a second row that scrolls sideways if it has to.
  const row = document.createElement('nav');
  row.setAttribute('aria-label', 'Documentation pages');
  row.className = 'border-t border-line lg:hidden';
  row.innerHTML = `<div class="mx-auto flex max-w-[1140px] gap-4 overflow-x-auto px-6 py-2 text-[13px]">${
    PAGES.map(p => link(p, `py-0.5 ${p.href === current ? 'border-b-2 border-accent' : 'border-b-2 border-transparent'}`)).join('')
  }</div>`;
  header.appendChild(row);
})();
