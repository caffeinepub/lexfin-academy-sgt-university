import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Role } from "../backend";
import { useActor } from "./useActor";

export function useIsRegistered() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isRegistered"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isRegistered();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegister() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      department,
      role,
    }: {
      name: string;
      email: string;
      department: string;
      role: Role;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.register(name, email, department, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isRegistered"] });
    },
  });
}
