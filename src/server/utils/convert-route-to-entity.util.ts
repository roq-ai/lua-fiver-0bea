const mapping: Record<string, string> = {
  'blockly-scripts': 'blockly_script',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
