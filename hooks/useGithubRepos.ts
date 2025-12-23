import { useEffect, useState } from "react";

const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN!;

type Repo = {
  id: string;
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
};

export function useGithubRepos(username: string) {
  const [starred, setStarred] = useState<Repo[]>([]);
  const [popular, setPopular] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchRepos() {
      try {
        setLoading(true);

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query ($username: String!) {
                user(login: $username) {
                  starredRepositories(first: 6) {
                    nodes {
                      id
                      name
                      description
                      stargazerCount
                      primaryLanguage { name }
                      url
                    }
                  }
                  repositories(
                    first: 6
                    ownerAffiliations: OWNER
                    orderBy: { field: STARGAZERS, direction: DESC }
                  ) {
                    nodes {
                      id
                      name
                      description
                      stargazerCount
                      primaryLanguage { name }
                      url
                    }
                  }
                }
              }
            `,
            variables: { username },
          }),
        });

        const json = await res.json();
        const user = json?.data?.user;

        if (!user) throw new Error("User not found");

        setStarred(
          user.starredRepositories.nodes.map(mapRepo)
        );
        setPopular(
          user.repositories.nodes.map(mapRepo)
        );
      } catch (e) {
        console.log("Repo fetch error:", e);
        setStarred([]);
        setPopular([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username]);

  return { starred, popular, loading };
}

function mapRepo(r: any) {
  return {
    id: r.id,
    name: r.name,
    description: r.description || "No description",
    stars: r.stargazerCount,
    language: r.primaryLanguage?.name || "—",
    url: r.url,
  };
}
