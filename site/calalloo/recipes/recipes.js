
function filterVibes(btn){
  document.querySelectorAll('.vibe-pill').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  var vibe = btn.getAttribute('data-vibe');
  document.querySelectorAll('.recipe-card').forEach(function(card){
    if(vibe === 'all'){
      card.style.display = '';
    } else {
      var cardVibe = card.getAttribute('data-vibe') || '';
      card.style.display = (cardVibe.indexOf(vibe) !== -1) ? '' : 'none';
    }
  });
}
