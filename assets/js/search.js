const pages = [...document.querySelectorAll(".sidebar a")];

document.getElementById("searchBox").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  pages.forEach(p => {
    p.style.display = p.textContent.toLowerCase().includes(q)
      ? "block"
      : "none";
  });
});
