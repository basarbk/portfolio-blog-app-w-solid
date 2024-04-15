export function Filter(props) {
  return (
    <div class="d-flex py-3">
      <div class="flex-grow-1">
        <button
          class="btn btn-sm btn-outline-dark"
          onClick={[props.setFilter, null]}
        >
          Latest
        </button>
      </div>
      <div class="d-flex gap-1">
        <button
          class="btn btn-sm btn-primary icon-link"
          onClick={[props.setFilter, "readingList"]}
        >
          <span class="material-symbols-outlined">bookmark</span>Reading List
        </button>
        <button
          class="btn btn-sm btn-warning icon-link"
          onClick={[props.setFilter, "hot"]}
        >
          <span class="material-symbols-outlined">local_fire_department</span>
          Hot
        </button>
        <button
          class="btn btn-sm btn-danger icon-link"
          onClick={[props.setFilter, "like"]}
        >
          <span class="material-symbols-outlined">favorite</span>Liked
        </button>
      </div>
    </div>
  );
}
