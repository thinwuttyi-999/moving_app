import { OutlinedInput } from "@mui/material";

export default function Search({ search, setSearch, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <OutlinedInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        size="small"
        sx={(theme) => ({
          width: "100%",
          bgcolor: theme.palette.background.paper,
          input: { color: theme.palette.text.primary },
        })}
      />
    </form>
  );
}