import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { memo } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface ErrorStateProps {
  error: unknown;
  message?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  subtextStyle?: TextStyle;
}

/**
 * Common error state component for displaying error messages
 */
function ErrorStateComponent({
  error,
  message,
  style,
  textStyle,
  subtextStyle,
}: ErrorStateProps) {
  const errorMessage = message || 'Failed to load';
  const errorDetails =
    typeof error === 'object' && error !== null && 'status' in error
      ? `Error: ${(error as { status: unknown }).status}`
      : null;

  return (
    <ThemedView style={[styles.container, style]}>
      <ThemedText type="default" style={[styles.errorText, textStyle]}>
        {errorMessage}
      </ThemedText>
      {errorDetails && (
        <ThemedText type="default" style={[styles.errorSubtext, subtextStyle]}>
          {errorDetails}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
  },
});

export const ErrorState = memo(ErrorStateComponent);

